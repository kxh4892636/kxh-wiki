const testUnionField = () => {
  // class UnionFind {
  //   constructor(n) {
  //     this.fa = new Array(n).map((_, index) => index);
  //   }

  //   find(x) {
  //     while (this.fa[x] !== x) {
  //       this.fa[x] = this.fa[this.fa[x]];
  //       x = this.fa[x];
  //     }
  //     return x;
  //   }

  //   union(x, y) {
  //     indexX = this.fa.indexOf(x);
  //     indexY = this.fa.indexOf(y);
  //     if (indexX !== indexY) {
  //       this.fa[x] = indexY;
  //     }
  //   }

  //   isConnected(x, y) {
  //     return this.find(x) === this.find(y);
  //   }
  // }

  class UnionFind {
    constructor(n) {
      this.fa = new Array(n).fill(0).map((_, index) => index);
    }

    union(x, y) {
      const indexY = this.fa.indexOf(y);
      this.fa[x] = indexY;
    }

    find(x) {
      while (this.fa[x] !== x) {
        this.fa[x] = this.fa[this.fa[x]];
        x = this.fa[x];
      }
      return x;
    }

    isConnected(x, y) {
      return this.find(x) === this.find(y);
    }
  }

  const temp = new UnionFind(8);
  temp.union(4, 5);
  temp.union(3, 5);
  if (temp.find(4) !== 5) throw Error("UnionFind");
  if (temp.find(3) !== 5) throw Error("UnionFind");
  if (temp.isConnected(3, 5) !== true) throw Error("UnionFind");
  if (temp.isConnected(1, 5) === true) throw Error("UnionFind");
};

try {
  testUnionField();
} catch (error) {
  console.log(error);
}
