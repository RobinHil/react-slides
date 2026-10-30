import { useRef } from 'react';
import { useShortcut, useLabels } from './hooks.js';

const tooltipAlign = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0"
};

const KEY_LABELS = {
    ArrowLeft: "←",
    ArrowRight: "→",
    ArrowUp: "↑",
    ArrowDown: "↓"
};

/** Round icon button with a tooltip fading in once the mouse rests on it and optional keyboard shortcuts, the first one shown, working only while the button is, or a link when it is given an address. */
function ToolbarButton({ icon, label, onClick, href, shortcut, align="center", className="" }) {
    const controlRef = useRef(null);
    const Tag = href ? "a" : "button";
    const keys = [shortcut ?? []].flat();
    const text = useLabels();

    useShortcut(shortcut, href ? () => location.assign(href) : onClick, controlRef);

    return (
        <div className={`group/tip relative shrink-0 ${className || "inline-flex"}`}>
            <Tag
                ref={controlRef}
                href={href}
                onClick={onClick}
                aria-label={label}
                aria-keyshortcuts={keys.join(" ") || undefined}
                className="h-11 w-10 sm:w-11 flex items-center justify-center rounded-full text-gray-600 transition ease-in-out delay-50 hover:text-gray-700 hover:bg-gray-300 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700 outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            >
                {icon}
            </Tag>
            <div aria-hidden="true" className={`absolute top-full mt-1 phone:top-auto phone:bottom-full phone:mt-0 phone:mb-1 z-50 pointer-events-none whitespace-nowrap flex items-center gap-2 ${tooltipAlign[align]} bg-gray-800/75 text-white text-sm px-2 py-1 rounded-md invisible opacity-0 transition-[opacity,visibility] duration-200 ease-fluid group-hover/tip:visible group-hover/tip:opacity-100 group-hover/tip:delay-300`}>
                {label}
                {keys.length>0 && (
                    <kbd className="rounded-sm bg-white/20 px-1.5 font-sans text-xs leading-5">{keys[0]==="Escape" ? text.escapeKey : KEY_LABELS[keys[0]] ?? keys[0].toUpperCase()}</kbd>
                )}
            </div>
        </div>
    );
}

export default ToolbarButton;
