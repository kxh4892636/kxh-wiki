import os
import shutil


def copy_images(origin: str, target: str):
    for filename in os.listdir(origin):
        source_file = os.path.join(origin, filename)
        destination_file = os.path.join(target, filename)
        if os.path.exists(destination_file):
            continue
        shutil.copy2(source_file, destination_file)


def print_valid_images(root_dir: str) -> list[str]:
    images: list[str] = list()
    for cur_dir, _, files in os.walk(root_dir):
        currentImages: list[str] = list()

        if (cur_dir.find('wiki\\docs') == -1 and cur_dir.find('wiki\\blog') == -1):
            continue

        for file in files:
            if not file.endswith('png'):
                continue
            currentImages.append(os.path.join(cur_dir, file))

        cur_fold = cur_dir.split('\\')[-1]
        if cur_fold != 'images':
            continue

        parent_fold = os.path.dirname(cur_dir)
        parent_fold_files = os.listdir(parent_fold)
        md_files_path: list[str] = list()

        for file in parent_fold_files:
            if not file.endswith('.md'):
                continue
            md_files_path.append(os.path.join(parent_fold, file))

        for path in md_files_path:
            content = str()
            with open(path, 'r', encoding='utf8') as f:
                content = f.read()
                for image in currentImages[:]:
                    image_name = image.split('\\')[-1]
                    if image_name in content:
                        currentImages.remove(image)

        images.extend(currentImages)

    for image in images:
        print(image)

    print(f'')
    return images


def delete_valid_images(images: list[str]) -> None:
    for image in images:
        os.remove(image)


def convert_chinese_symbols(root_dir: str) -> None:
    for cur_dir, _, files in os.walk(root_dir):
        if (cur_dir.find('wiki\\docs') == -1 and cur_dir.find('wiki\\blog') == -1):
            continue

        for file in files:
            if not file.endswith('.md') or '.git' in cur_dir or '.obsidian' in cur_dir:
                continue

            file_path = os.path.join(cur_dir, file)
            with open(file_path, 'r+', encoding='utf8') as f:
                text = f.read()
                text = text.replace("，", ", ")
                text = text.replace("。", ". ")
                text = text.replace("！", "! ")
                text = text.replace("？", "? ")
                text = text.replace("；", "; ")
                text = text.replace("：", ": ")
                text = text.replace("“", " \"")
                text = text.replace("”", "\" ")
                text = text.replace("‘", " '")
                text = text.replace("’", "' ")
                text = text.replace("（", " (")
                text = text.replace("）", ") ")
                text = text.replace("【", " [")
                text = text.replace("】", "] ")
                text = text.replace("、", ", ")
                f.seek(0)
                f.truncate()
                f.seek(0)
                f.write(text)


def count_note_size(root_dir: str) -> None:
    noteSize = 0
    diarySize = 0
    noteNum = 0
    diaryNum = 0

    for cur_dir, _, files in os.walk(root_dir):
        if (cur_dir.find('wiki\\docs') == -1 and cur_dir.find('wiki\\blog') == -1):
            continue

        for file in files:
            if not file.endswith('.md'):
                continue
            if file == '_sidebar.md':
                continue
            if file == 'README.md':
                continue

            if ('1020_' in cur_dir):
                diarySize += os.path.getsize(os.path.join(cur_dir, file))
                diaryNum += 1
            else:
                noteSize += os.path.getsize(os.path.join(cur_dir, file))
                noteNum += 1

    print(f'共 {noteNum} 个笔记')
    print(f'{noteSize/(1024*1024)} MB')
    print(f'约合中文字符 {noteSize/2} 个')
    print(f'')
    print(f'共 {diaryNum} 个日记')
    print(f'{diarySize/(1024*1024)} MB')
    print(f'约合中文字符 {diarySize/2} 个')
    print(f'')


def find_long_note(root_dir: str) -> None:
    print(f'以下文件行数超过 999')
    for cur_dir, _, files in os.walk(root_dir):
        if (cur_dir.find('wiki\\docs') == -1 and cur_dir.find('wiki\\blog') == -1):
            continue

        if 'diary' in cur_dir:
            continue

        for file in files:
            if not file.endswith('.md') or file == '_sidebar.md' or file == 'README.md' or '1020' in cur_dir or '.git' in cur_dir or '.obsidian' in cur_dir:
                continue

            file_path = os.path.join(cur_dir, file)
            with open(file_path, 'r', encoding='utf8') as f:
                content = f.readlines()
                lines_num = len(content)

                if lines_num > 999:
                    print(file_path)

    print(f'')


if __name__ == '__main__':
    dir = r'D:\kxh\10_wiki'

    copy_images(r'D:\kxh\10_wiki\docs\1070_科研\107090_文献笔记\images',
                r'D:\kxh\10_wiki\docs\1070_科研\107090_文献整理\images')
    images = print_valid_images(dir)
    delete_valid_images(images)
    # convert_chinese_symbols(dir)
    count_note_size(dir)
    find_long_note(dir)
