interface Glyph {
  Draw(): void;
  Intersects?(): void;
  Insert?(): void;
}

class Character implements Glyph {
  Draw(): void {
    console.log("Draw");
  }
  Intersects(): void {
    console.log("Intersects");
  }
  Insert(): void {
    console.log("Insert");
  }
}

class Polygon implements Glyph {
  Draw(): void {
    console.log("Draw");
  }
}
