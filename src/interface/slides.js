import { Children, Fragment, isValidElement } from 'react';

/** One slide of a presentation, whose props set its theme, background, font, corners, notes and the transition leading to it. */
function Slide({ children }) {
    return children;
}

/** Lists the children of a presentation, opening the fragments that group slides. */
function flatten(children) {
    return Children.toArray(children).flatMap((child) => child.type===Fragment ? flatten(child.props.children) : [child]);
}

/** Keeps the settings that are given, so that they only replace those that come before them. */
function given(settings) {
    return Object.fromEntries(Object.entries(settings).filter(([, value]) => value!==undefined));
}

/** Layers settings over one another, each replacing the ones before, the corners being merged or all dropped with false. */
function layer(...layers) {
    return layers.reduce((settings, next) => ({
        ...settings,
        ...next,
        corners: next.corners===false || settings.corners===false ? (next.corners ?? false) : { ...settings.corners, ...next.corners }
    }));
}

/** Reads the slides of a presentation from its children, each laid over the settings of the presentation and its own theme. */
function readSlides(children, deck) {
    return flatten(children).map((child) => {
        if (!isValidElement(child) || child.type!==Slide)
            throw new Error("A Presentation only takes <Slide> elements as children");
        const { children: content, theme={}, notes, ...settings } = child.props;
        const slide = layer(deck, theme, given(settings));
        return { ...slide, content, notes, corners: slide.corners || {} };
    });
}

export { Slide, flatten, given, layer, readSlides };
