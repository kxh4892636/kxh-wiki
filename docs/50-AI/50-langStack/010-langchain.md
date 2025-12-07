# langchain

## 概述

### 安装

```bash
bun add langchain @langchain/core
```

## Agent

- createAgent 创建 Agent;
  - systemPrompt: 系统提示词, 用于定义 Agent 的行为;
  - model: 模型: 用于定义 Agent 使用的模型;
  - responseFormat: 响应格式, 用于定义 Agent 的输出格式;
  - checkpointer: 记忆, 用于存储 Agent 的状态;
  - tools: 工具: 用于定义 Agent 可以使用的工具;
  - invoke/stream: 用于调用 Agent;
  - middleware: 中间件, 用于在 Agent 执行过程中的不同阶段添加自定义逻辑;

```typescript
import { createAgent, tool, initChatModel, type ToolRuntime } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import * as z from "zod";

// 定义系统提示词
const systemPrompt = `You are an expert weather forecaster, who speaks in puns.

You have access to two tools:

- get_weather_for_location: use this to get the weather for a specific location
- get_user_location: use this to get the user's location

If a user asks you for the weather, make sure you know the location. If you can tell from the question that they mean wherever they are, use the get_user_location tool to find their location.`;

// 定义工具
const getWeather = tool(({ city }) => `It's always sunny in ${city}!`, {
  name: "get_weather_for_location",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string(),
  }),
});

type AgentRuntime = ToolRuntime<unknown, { user_id: string }>;

const getUserLocation = tool(
  (_, config: AgentRuntime) => {
    const { user_id } = config.context;
    return user_id === "1" ? "Florida" : "SF";
  },
  {
    name: "get_user_location",
    description: "Retrieve user information based on user ID",
    schema: z.object({}),
  }
);

// 配置模型
const model = await initChatModel("claude-sonnet-4-5-20250929", {
  temperature: 0,
});

// 定义响应格式
const responseFormat = z.object({
  punny_response: z.string(),
  weather_conditions: z.string().optional(),
});

// 配置记忆
const checkpointer = new MemorySaver();

// 创建Agent
const agent = createAgent({
  model,
  systemPrompt,
  responseFormat,
  checkpointer,
  tools: [getUserLocation, getWeather],
});

// 运行Agent
// `thread_id` 是给定对话的唯一标识符
const config = {
  configurable: { thread_id: "1" },
  context: { user_id: "1" },
};

const response = await agent.invoke(
  { messages: [{ role: "user", content: "what is the weather outside?" }] },
  config
);
console.log(response.structuredResponse);

// 注意：我们可以使用相同的 `thread_id` 继续对话
const thankYouResponse = await agent.invoke(
  { messages: [{ role: "user", content: "thank you!" }] },
  config
);
console.log(thankYouResponse.structuredResponse);
```

## System Prompt

### System Prompt

- 定义 Agent 的上下文;
- 未提供系统提示词时, 直接根据用户输入推断;

### Dynamic System Prompt

- 根据上下文动态调整提示词;
- langchain 提供 dynamicSystemPromptMiddleware 中间件;

```typescript
import * as z from "zod";
import { createAgent, dynamicSystemPromptMiddleware } from "langchain";

const contextSchema = z.object({
  userRole: z.enum(["expert", "beginner"]),
});

const agent = createAgent({
  model: "gpt-4o",
  tools: [
    /* ... */
  ],
  contextSchema,
  middleware: [
    dynamicSystemPromptMiddleware<z.infer<typeof contextSchema>>(
      (state, runtime) => {
        const userRole = runtime.context.userRole || "user";
        const basePrompt = "You are a helpful assistant.";

        if (userRole === "expert") {
          return `${basePrompt} Provide detailed technical responses.`;
        } else if (userRole === "beginner") {
          return `${basePrompt} Explain concepts simply and avoid jargon.`;
        }
        return basePrompt;
      }
    ),
  ],
});

// 调用 Agent 时, 动态提示词会根据上下文中的 userRole 调整
const result = await agent.invoke(
  { messages: [{ role: "user", content: "Explain machine learning" }] },
  { context: { userRole: "expert" } }
);
```

## Model

### 使用模型

- 单独使用: 脱离 Agent, 直接调用模型;
- 与 Agent 交互: 创建 Agent 时配置模型;

### 单独使用

#### OpenAi 适配器

```typescript
bun add @langchain/openai
```

#### 初始化模型

```typescript
import { initChatModel } from "langchain";

const model = await initChatModel("gpt-4o", {
  apiKey: "your-api-key",
  temperature: 0.1,
  maxTokens: 1000,
  timeout: 30,
  maxRetries: 3,
});
```

#### 调用模型

##### 串行调用

```typescript
const response = await model.invoke("Why do parrots talk?");
```

##### 流式调用

```typescript
const stream = await model.stream("Why do parrots have colorful feathers?");
for await (const chunk of stream) {
  console.log(chunk.text);
}
```

##### 并行调用

```typescript
const responses = await model.batch([
  "Why do parrots have colorful feathers?",
  "How do airplanes fly?",
  "What is quantum computing?",
  {
    maxConcurrency: 5, // 限制最大并发调用数为 5
  },
]);
for (const response of responses) {
  console.log(response);
}
```

### 调用工具

#### 调用原理

- 基于 function calling 调用工具;

```typescript
const model = new ChatOpenAI({ model: "gpt-4o" });
const modelWithTools = model.bindTools([getWeather]);

const response = await modelWithTools.invoke(
  "What's the weather like in Boston?"
);
const toolCalls = response.tool_calls || [];
for (const tool_call of toolCalls) {
  // 调用工具属性
  console.log(`Tool: ${tool_call.name}`);
  console.log(`Args: ${tool_call.args}`);
}
```

#### 最佳实践

##### 工具执行循环

- 根据 tool_calls 属性获取工具调用, 并执行;

```typescript
// 绑定工具到模型
const modelWithTools = model.bindTools([get_weather]);

// 模型生成工具调用
const messages = [{ role: "user", content: "What's the weather in Boston?" }];
const ai_msg = await modelWithTools.invoke(messages);
messages.push(ai_msg);

// 执行工具调用
// 大模型自行选择, 并非每个工具调用都执行
// 默认并行执行工具调用
for (const tool_call of ai_msg.tool_calls) {
  // Execute the tool with the generated arguments
  const tool_result = await get_weather.invoke(tool_call);
  messages.push(tool_result);
}

// 模型生成最终响应
const final_response = await modelWithTools.invoke(messages);
console.log(final_response.text);
// "The current weather in Boston is 72°F and sunny."
```

##### 强制工具调用

- 配置 toolChoice 为 "any", 强制模型调用工具;

```typescript
const modelWithTools = model.bindTools([tool_1], { toolChoice: "any" });
```

##### 强制串行调用

- 配置 parallel_tool_calls 为 False, 强制串行执行工具调用;

```typescript
model.bind_tools([get_weather], (parallel_tool_calls = False));
```

##### 流式工具调用

- 使用 stream 调用模型;
- 使用 tool_call_chunks 属性获取流式工具调用;
- 每个流式工具调用包含 name 和 args 属性;

```typescript
const stream = await modelWithTools.stream(
  "What's the weather in Boston and Tokyo?"
);
for await (const chunk of stream) {
  // 处理工具调用流式响应
  if (chunk.tool_call_chunks) {
    for (const tool_chunk of chunk.tool_call_chunks) {
      console.log(`Tool: ${tool_chunk.get("name", "")}`);
      console.log(`Args: ${tool_chunk.get("args", "")}`);
    }
  }
}
```

### 结构化输出

#### 结构化输出

- 使用 zod schema 配合 withStructuredOutput 实现结构化输出;

```typescript
import * as z from "zod";

const Movie = z.object({
  title: z.string().describe("The title of the movie"),
  year: z.number().describe("The year the movie was released"),
  director: z.string().describe("The director of the movie"),
  rating: z.number().describe("The movie's rating out of 10"),
});

const modelWithStructure = model.withStructuredOutput(Movie);

const response = await modelWithStructure.invoke(
  "Provide details about the movie Inception"
);
console.log(response);
// {
//   title: "Inception",
//   year: 2010,
//   director: "Christopher Nolan",
//   rating: 8.8,
// }
```

#### 原始消息

- 配置 includeRaw 为 True, 包含原始消息;

```typescript
const modelWithStructure = model.withStructuredOutput(Movie, {
  includeRaw: true,
});
// {
//   raw: AIMessage { ... },
//   parsed: { title: "Inception", ... }
// }
```

### Agent 交互

#### 静态模型

##### 静态模型

- 调用 createAgent 时配置, 整个执行过程不改变;

```typescript
import { createAgent } from "langchain";

const agent = createAgent({
  model: "gpt-5",
  tools: [],
});
```

##### 模型配置

- 设置模型参数, 通过默认模块实现;

```typescript
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0.1,
  maxTokens: 1000,
  timeout: 30,
});
```

#### 动态模型

##### 动态模型

- 根据上下文动态切换模型;
- 使用中间件 wrapModelCall 实现;

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { createAgent, createMiddleware } from "langchain";

const basicModel = new ChatOpenAI({ model: "gpt-4o-mini" });
const advancedModel = new ChatOpenAI({ model: "gpt-4o" });

const dynamicModelSelection = createMiddleware({
  name: "DynamicModelSelection",
  wrapModelCall: (request, handler) => {
    // 根据消息数量选择模型
    const messageCount = request.messages.length;

    return handler({
      ...request,
      model: messageCount > 10 ? advancedModel : basicModel,
    });
  },
});

const agent = createAgent({
  model: "gpt-4o-mini", // 基础模型 (当消息数量 ≤ 10 时使用)
  tools,
  middleware: [dynamicModelSelection],
});
```

## Message

### 消息结构

#### 消息结构

- role: 角色, 标识消息类型;
- content: 消息内容;
- metadata: 消息元数据;

#### 消息定义

- 文本提示词;
- langchain 消息类型;
- OpenAi 格式;

```typescript
// 文本提示词
const response = await model.invoke("Write a haiku about spring");

// langchain 消息
import { SystemMessage, HumanMessage, AIMessage } from "langchain";
const messages = [
  new SystemMessage("You are a poetry expert"),
  new HumanMessage("Write a haiku about spring"),
  new AIMessage("Cherry blossoms bloom..."),
];

// OpenAi 格式
const messages = [
  { role: "system", content: "You are a poetry expert" },
  { role: "user", content: "Write a haiku about spring" },
  { role: "assistant", content: "Cherry blossoms bloom..." },
];
```

### Message Type

#### System Message

- 初始指令, 给定模型上下文;

```typescript
const systemMsg = new SystemMessage(`
You are a senior TypeScript developer with expertise in web frameworks.
Always provide code examples and explain your reasoning.
Be concise but thorough in your explanations.
`);
```

#### Human Message

- 用户输入, 多模态内容;

```typescript
// 文本数据
const humanMsg = new HumanMessage("What is machine learning?");

// 元数据, 根据不同模型而定
const humanMsg = new HumanMessage({
  content: "Hello!",
  name: "alice",
  id: "msg_123",
});
```

#### AI Message

##### AI Message

- 模型调用的输出, 包含多模态数据, 工具调用和元数据等;

```typescript
interface AIMessage {
  text: string; // 消息的文本内容
  content: string | ContentBlock[]; // 消息的原始内容
  content_blocks: ContentBlock.Standard[]; // 消息的标准化内容块
  tool_calls: ToolCall[] | None; // 模型发起的工具调用
  id: string; // 消息的唯一标识符
  usage_metadata: UsageMetadata | None; // 消息的使用元数据
  response_metadata: ResponseMetadata | None; // 消息的响应元数据
}
```

##### 流式调用

- 接受 AIMessageChunk 对象;
- 合并多个 chunk 为完整消息;

```typescript
import { AIMessageChunk } from "langchain";

const stream = await model.stream("Why do parrots have colorful feathers?");

let finalChunk: AIMessageChunk | undefined;
for (const chunk of stream) {
  finalChunk = finalChunk ? finalChunk.concat(chunk) : chunk;
}
```

#### Tool Message

##### Tool Message

- 工具调用返回的结果;

```typescript
import { AIMessage, ToolMessage } from "langchain";

// mock 模型调用工具
const aiMessage = new AIMessage({
  content: [],
  tool_calls: [
    {
      name: "get_weather",
      args: { location: "San Francisco" },
      id: "call_123",
    },
  ],
});

// mock 工具调用返回结果
const toolMessage = new ToolMessage({
  content: "Sunny, 72°F",
  tool_call_id: "call_123",
});

const messages = [
  new HumanMessage("What's the weather in San Francisco?"),
  aiMessage, // Model's tool call
  toolMessage, // Tool execution result
];

const response = await model.invoke(messages); // Model processes the result
```

##### Tool Message 属性

```typescript
interface ToolMessage {
  content: string; // 工具调用的字符串化输出
  tool_call_id: string; // 对应的工具调用 ID, 必须与 AIMessage 中的工具调用 ID 匹配
  name: string; // 被调用的工具名称
  artifact?: Record<string, any>; // 未发送到模型但可通过编程方式访问的额外数据, 可用于缓存, rag, 记忆等
}
```

### Message Content

#### Message Content

- AI Message 的 content 属性;
- 可能类型;
  - 字符串;
  - 模型提供商的特定格式;
  - langchain standard content block;

#### Standard Content Block

##### Standard Content Block

- langchain 定义的标准内容块;
- 支持任意 Message Type;
  - 位于 AI Message 的 contentBlocks 属性中;
- 支持多模态数据;

```typescript
import { AIMessage } from "@langchain/core/messages";

const message = new HumanMessage({
  content: [
    { type: "text", text: "Describe the content of this image." },
    {
      type: "image",
      source_type: "url",
      url: "https://example.com/path/to/image.jpg",
    },
  ],
});

const message = new AIMessage({
  content: [
    {
      type: "reasoning",
      id: "rs_abc123",
      summary: [
        { type: "summary_text", text: "summary 1" },
        { type: "summary_text", text: "summary 2" },
      ],
    },
    { type: "text", text: "..." },
  ],
  response_metadata: { model_provider: "openai" },
});
```

##### Content Block Reference

- [类型定义](https://docs.langchain.com/oss/javascript/langchain/messages#content-block-reference);
- 类型定义可通过 ContentBlock 类型引入;

```typescript
import { ContentBlock } from "langchain";

// Text block
const textBlock: ContentBlock.Text = {
  type: "text",
  text: "Hello world",
};

// Image block
const imageBlock: ContentBlock.Multimodal.Image = {
  type: "image",
  url: "https://example.com/image.png",
  mimeType: "image/png",
};
```

## Tool

### 工具调用模型

- Agent 使用 ReAct (Reasoning + Acting) 的模式调用工具;

### 定义工具

- 使用 tool 函数定义工具;
- 每个工具都有名称、描述和输入参数的模式;

```typescript
import * as z from "zod";
import { tool } from "langchain";

const search = tool(({ query }) => `Results for: ${query}`, {
  name: "search",
  description: "Search for information",
  schema: z.object({
    query: z.string().describe("The query to search for"),
  }),
});
```

### 错误处理

- 使用中间件 wrapToolCall 实现;
- 当工具调用失败时, 可以捕获错误并返回自定义响应;

```typescript
import { createMiddleware, ToolMessage } from "langchain";

const handleToolErrors = createMiddleware({
  name: "HandleToolErrors",
  wrapToolCall: async (request, handler) => {
    try {
      return await handler(request);
    } catch (error) {
      // 捕获工具调用错误, 返回自定义错误消息
      return new ToolMessage({
        content: `Tool error: Please check your input and try again. (${error})`,
        tool_call_id: request.toolCall.id!,
      });
    }
  },
});
```

## 记忆

### 短期记忆

- 使用

```typescript
import * as z from "zod";
import { MessagesZodState } from "@langchain/langgraph";
import { createAgent } from "langchain";
import { type BaseMessage } from "@langchain/core/messages";

const customAgentState = z.object({
  messages: MessagesZodState.shape.messages,
  userPreferences: z.record(z.string(), z.string()),
});

const CustomAgentState = createAgent({
  model: "gpt-4o",
  tools: [],
  stateSchema: customAgentState,
});
```

## Agent 调用

## 结构化输出

- 使用 zod 配置结构化输出;
- 使用 responseFormat 参数;

```typescript
import * as z from "zod";
import { createAgent } from "langchain";

const ContactInfo = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

const agent = createAgent({
  model: "gpt-4o",
  responseFormat: ContactInfo,
});
```
