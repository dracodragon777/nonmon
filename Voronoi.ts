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
