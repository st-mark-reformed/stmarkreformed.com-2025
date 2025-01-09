export class Segments {
    public path: string;

    public trimmedPath: string;

    public segments: Array<string>;

    constructor (path: string) {
        this.segments = path.split('/').filter((part) => part !== '');

        this.trimmedPath = this.segments.join('/');

        this.path = `/${this.trimmedPath}`;
    }

    public segment (position: number): string | null {
        if (position < 1) {
            throw new Error('position starts from 1');
        }

        return this.segments[position - 1] || null;
    }

    public fromSegmentsAfter (position: number): Segments {
        if (position < 1) {
            throw new Error('position starts from 1');
        }

        const newSegments = this.segments.slice(position);

        return new Segments(newSegments.join('/'));
    }
}
