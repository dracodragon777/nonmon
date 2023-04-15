class Vector2 extends Vector {
    constructor(x: number, y: number) {
        super([x, y])
    }

    get x() { return this._components[0]; }
    get y() { return this._components[1]; }

    public override add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    public override subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    public override scalar(scale: number): Vector2 {
        return new Vector2(this.x * scale, this.y * scale);
    }
    public override normalize(): Vector2 {
        return this.scalar(1 / this.length());
    }
    public override withLength(length: number): Vector2 {
        return this.normalize().scalar(length);
    }
    public override negate(): Vector2 {
        return this.scalar(-1);
    }
    public override projectOn(other: Vector2): Vector2 {
        const normalized = other.normalize();
        return normalized.scalar(this.dotProduct(normalized));
    }
    public override midpoint(other: Vector2): Vector2 {
        return new Vector2((this.x + other.x) * 0.5, (this.y + other.y) * 0.5);
    }
    
    public angleBetween(other: Vector2): number {
        return super.angleBetween(other);
    }
    public dotProduct(other: Vector2): number {
        return super.dotProduct(other);
    }
    public haveSameDirectionWith(other: Vector2): boolean {
        return super.haveSameDirectionWith(other);
    }
    public haveOppositeDirectionTo(other: Vector2): boolean {
        return super.haveOppositeDirectionTo(other);
    }
    public isPerpendicularTo(other: Vector2): boolean {
        return super.isPerpendicularTo(other);
    }
    public distanceTo(other: Vector2): number {
        return super.distanceTo(other);
    }
    public distanceToSquared(other: Vector2): number {
        return super.distanceToSquared(other);
    }
}
