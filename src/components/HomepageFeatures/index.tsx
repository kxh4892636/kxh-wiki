import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "关于我",
    description: <div>就读于 🏫 NNU 的 🌌 GISer.</div>,
  },
  {
    title: "支持我",
    description: (
      <div>
        给我{" "}
        <a rel="github" href="https://github.com/kxh4892636/kxh-wiki">
          github
        </a>{" "}
        一颗闪亮的✨
      </div>
    ),
  },
  {
    title: "联系我",
    description: <div>📧 kxh4892636@gmail.com</div>,
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <div>{description}</div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
