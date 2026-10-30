import { createContext, use } from 'react';

const SlideThemeContext = createContext({ codeTheme: "dark", diagramTheme: "light" });

/** Gives the settings of the theme of the slide that its components follow by default, such as the theme of code blocks and diagrams or the font. */
function useSlideTheme() {
    return use(SlideThemeContext);
}

export { useSlideTheme, SlideThemeContext };
