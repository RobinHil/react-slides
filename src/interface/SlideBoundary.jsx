import { Component } from 'react';
import { useLabels } from './hooks.js';

/** Card standing in for a slide that failed, with the error that broke it. */
function SlideError({ error, number }) {
    const text = useLabels();

    return (
        <div className="flex items-center justify-center min-h-full">
            <div className="max-w-[60%] rounded-2xl border-4 border-red-300 bg-red-50 px-12 py-10 text-red-900">
                <p className="text-4xl font-bold">{text.slideError} ({text.slide} {number})</p>
                <p className="mt-6 font-mono text-2xl wrap-break-word">{error.message}</p>
            </div>
        </div>
    );
}

/** Keeps a failing slide from breaking the whole presentation, showing its error in its place. */
class SlideBoundary extends Component {
    state = { error: null };

    /** Remembers the error thrown while drawing the slide. */
    static getDerivedStateFromError(error) {
        return { error };
    }

    /** Draws the slide, or its error once it has failed. */
    render() {
        if (this.state.error)
            return <SlideError error={this.state.error} number={this.props.number} />;
        return this.props.children;
    }
}

export default SlideBoundary;
