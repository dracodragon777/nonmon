type Point = Vector2 | Vector3;

class Site {
    index: number;
    point: Point;
    constructor(point: Point, index: number) {
        this.point = point;
        this.index = index;
    }
}

class Edge {
    va: Point;
    vb: Point;
    cells: Cell[];
    constructor(va: Point, vb: Point, voronoi: /* this */ Voronoi) {
        /* let a = 5, b = a; console.log(b) */
        this.va = voronoi.vertices[voronoi.vertices.indexOf(va)];
        this.vb = voronoi.vertices[voronoi.vertices.indexOf(vb)];
        // from voronoi get the cells?
    }

    public equalTo(other: Edge) {
        return (this.va.equalTo(other.va) && this.vb.equalTo(other.vb)) || (this.va.equalTo(other.vb) && this.vb.equalTo(other.va))
    }
}

class Triangle {
    protected _vertices: [Point, Point, Point];
    protected _edges: [Edge, Edge, Edge];
    constructor(a: Point, b: Point, c: Point) {
        this._vertices = [a, b, c];
        this._edges = [new Edge(a, b), new Edge(b, c), new Edge(c, a)]
    }

    get edges() { return this._edges; }
    get vertices() { return this._vertices; }

    get a() { return this._vertices[0]; }
    get b() { return this._vertices[1]; }
    get c() { return this._vertices[2]; }

    get ab() { return this._edges[0]; }
    get bc() { return this._edges[1]; }
    get ca() { return this._edges[2]; }

    public move(vector: Point) {
        const vertices = this.vertices.map((v, i) => {
            if(v instanceof Vector2 && vector instanceof Vector2) return v.add(vector)
            else if(v instanceof Vector3 && vector instanceof Vector3) return v.add(vector)
            else return null;
        });
        return new Triangle(vertices[0], vertices[1], vertices[2]);
    }

    containsPoint(point: Point): boolean {
        const [a, b, c] = this.vertices;
        const det = ((b.components[1] - c.components[1]) * (a.components[0] - c.components[0]) +
            (c.components[0] - b.components[0]) * (a.components[1] - c.components[1]));

        const alpha = ((b.components[1] - c.components[1]) * (point.components[0] - c.components[0]) +
            (c.components[0] - b.components[0]) * (point.components[1] - c.components[1])) / det;
        const beta = ((c.components[1] - a.components[1]) * (point.components[0] - c.components[0]) +
            (a.components[0] - c.components[0]) * (point.components[1] - c.components[1])) / det;
        const gamma = 1 - alpha - beta;

        return alpha >= 0 && alpha <= 1 && beta >= 0 && beta <= 1 && gamma >= 0 && gamma <= 1;
    }
    sharesEdge(other: Triangle): boolean {
        const sharedVertices = this.vertices.filter(vertex => other.vertices.includes(vertex));
        return sharedVertices.length === 2;
    }

    circumcircleContains(point: Point): boolean {
        const [a, b, c] = this.vertices;
        const circleCenter = VectorFunctions.circleCenter(new Edge(a, b), new Edge(b, c));
        const radiusSquared = circleCenter.distanceToSquared(a);
        const pointDistanceSquared = circleCenter.distanceToSquared(point);
        return pointDistanceSquared <= radiusSquared;
    }

    hasVertex(vertex: Point): boolean {
        return this.vertices.includes(vertex);
    }

    isNeighbor(other: Triangle): boolean {
        const sharedVertices = this.vertices.filter(vertex => other.vertices.includes(vertex));
        return sharedVertices.length === 2;
    }

    isDelaunayForPoint(point: Point): boolean {
        const [a, b, c] = this.vertices;
        const circleCenter = VectorFunctions.circleCenter(new Edge(a, b), new Edge(b, c));
        const radiusSquared = circleCenter.distanceToSquared(a);
        const pointDistanceSquared = circleCenter.distanceToSquared(point);
        return pointDistanceSquared >= radiusSquared;
    }
}

class Cell {
    edges: Edge[];
    site: Site;
    //private voronoi: Voronoi;
    constructor(site: Site, voronoi: /* this */ Voronoi) {
        /* let a = 5, b = a; console.log(b) */
        this.site = voronoi.sites[site.index];
        // calc here
        this.edges = [];
    }
    get id() {
        return this.site.index;
    }
}

class Voronoi {
    sites: Site[];
    vertices: Point[];
    edges: Edge[];
    cells: Cell[];

    constructor(points: Point[]) {
        this.sites = points.map((point, index) => new Site(point, index))
        this.vertices = [];
        this.edges = [];
        this.cells = [];
        // run the incremental Delaunay triangulation
    }

    compute() {
        if (this.sites.length > 0) {
            if (this.sites[0] instanceof Vector2) return this.compute2D();
            else if (this.sites[0] instanceof Vector3) return this.compute3D();
        } else return null;
    }
    private compute2D() {
        // Implement the 2D Voronoi diagram algorithm here
    }

    private compute3D() {
        // Implement the 3D Voronoi diagram algorithm here
    }
}
