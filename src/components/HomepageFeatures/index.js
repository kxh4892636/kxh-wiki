import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '关于我',
    description: (
      <>
      就读于 🏫 NNU 的 🌌 GISer.
      </>
    ),
  },
  {
    title: '支持我',
    description: (
      <div>
      给我 <a rel='github' href='https://github.com/kxh4892636/kxh-wiki'>github</a> 一颗闪亮的✨
      </div>
    ),
  },
  {
    title: '联系我',
    description: (
      <> 
      📧 kxh4892636@gmail.com
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
