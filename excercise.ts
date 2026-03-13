/**
 * Exercise:
 *
 * 1. Create a class `Circle` that extends the `Shape` class.
 * 2. Override the required methods from `Shape`.
 * 3. Implement a getter method to access the circle's radius.
 * 4. Create an array containing both `Circle` and `Rectangle` objects.
 * 5. Iterate through the array and determine which shape has the smallest area.
 */

interface Point {
  x: number;
  y: number;
}

abstract class Shape {
  private origin: Point;

  constructor(origin: Point = { x: 0, y: 0 }) {
    this.origin = origin;
  }

  abstract area(): number;
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
    this.width = width;
    this.height = height;
  }

  override area(): number {
    return this.width * this.height;
  }

  get w(): number {
    return this.width;
  }

  get h(): number {
    return this.height;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
    this.radius = radius;
  }

  override area(): number {
    return Math.PI * this.radius * this.radius;
  }

  get r(): number {
    return this.radius;
  }
}

const shapes: Shape[] = [
  new Rectangle(10, 5),
  new Rectangle(3, 4),
  new Circle(3),
  new Circle(1),
];

let smallest = shapes[0];
console.log(shapes);
for (const shape of shapes) {
  if (shape.area() < smallest!.area()) {
    smallest = shape;
  }
}

console.log("smallest area", smallest!.area());
