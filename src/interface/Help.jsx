import { useEffect, useLayoutEffect, useRef } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useLabels } from './hooks.js';
import { usePanels } from '../contexts/Panels.context.jsx';

/** Line of the help, the keys of a shortcut beside what it does. */
function Shortcut({ keys, children }) {
    return (
        <li className="flex items-center justify-between gap-4 py-1.5">
            <span className="text-gray-600 dark:text-gray-300">{children}</span>
            <span className="flex shrink-0 gap-1">
                {keys.map((key) => (
                    <kbd key={key} className="min-w-7 rounded-md border border-b-2 border-gray-200 bg-gray-50 px-1.5 text-center font-sans text-xs font-semibold leading-6 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">{key}</kbd>
                ))}
            </span>
        </li>
    );
}

/** Group of shortcuts of the help, under its title. */
function ShortcutGroup({ title, children }) {
    return (
        <section>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{title}</h3>
            <ul className="divide-y divide-gray-100 text-sm dark:divide-gray-800">{children}</ul>
        </section>
    );
}

/** Card listing the keyboard shortcuts of the controls shown when it opened, over the deck, opened with the question mark and closed with it, Escape or a click beside it. */
function Help() {
    const { isHelpVisible, helpKeys, toggleHelp } = usePanels();
    const text = useLabels();
    const has = (...keys) => keys.some((key) => helpKeys.includes(key.toLowerCase()));
    const dialogRef = useRef(null);
    const wasVisibleRef = useRef(false);

    useLayoutEffect(() => {
        if (wasVisibleRef.current===isHelpVisible)
            return;
        wasVisibleRef.current = isHelpVisible;
        const dialog = dialogRef.current;
        if (isHelpVisible)
            dialog.focus({ preventScroll: true });
        else if (dialog.contains(document.activeElement))
            document.activeElement.blur();
    }, [isHelpVisible]);

    useEffect(() => {
        if (!isHelpVisible)
            return;
        const handleKeyDown = (event) => {
            if (event.ctrlKey || event.metaKey || event.altKey)
                return;
            event.stopPropagation();
            if (event.key==="Escape" || event.key==="?") {
                event.preventDefault();
                toggleHelp();
            }
        };
        window.addEventListener("keydown", handleKeyDown, true);
        return () => window.removeEventListener("keydown", handleKeyDown, true);
    }, [isHelpVisible, toggleHelp]);

    return (
        <div
            inert={!isHelpVisible}
            onClick={(event) => event.target===event.currentTarget && toggleHelp()}
            className={`fixed inset-0 z-60 flex items-center justify-center p-4 bg-gray-950/30 backdrop-blur-sm duration-500 ease-fluid ${isHelpVisible?"visible opacity-100 transition-opacity":"invisible opacity-0 transition-[opacity,visibility]"}`}
        >
            <div
                ref={dialogRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={text.help}
                className={`w-full max-w-2xl max-h-full overflow-y-auto rounded-2xl bg-white p-5 sm:p-7 shadow-2xl ring-1 ring-gray-200 outline-hidden transition-[scale] duration-500 ease-fluid dark:bg-gray-900 dark:ring-gray-700 dark:shadow-black/60 ${isHelpVisible?"scale-100":"scale-97"}`}
            >
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{text.help}</h2>
                    <ToolbarButton icon={<Icon icon={faXmark} />} label={text.close} onClick={() => toggleHelp()} align="right" />
                </div>
                <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-5">
                        <ShortcutGroup title={text.helpNavigation}>
                            {has("ArrowLeft", "ArrowRight") && <Shortcut keys={["←", "→"]}>{text.helpSteps}</Shortcut>}
                            {has("ArrowDown", "ArrowUp") && <Shortcut keys={["↓", "↑"]}>{text.helpEnds}</Shortcut>}
                            <Shortcut keys={["0-9"]}>{text.helpNumber}</Shortcut>
                        </ShortcutGroup>
                        <ShortcutGroup title={text.helpActions}>
                            {has("p") && <Shortcut keys={["P"]}>{text.exportPdf}</Shortcut>}
                            {has("v") && <Shortcut keys={["V"]}>{text.presenter}</Shortcut>}
                            {has("h") && <Shortcut keys={["H"]}>{text.home}</Shortcut>}
                            <Shortcut keys={["?"]}>{text.help}</Shortcut>
                            <Shortcut keys={[text.escapeKey]}>{text.helpClose}</Shortcut>
                        </ShortcutGroup>
                    </div>
                    {has("m", "s", "n", "b", "f") && (
                        <ShortcutGroup title={text.helpDisplay}>
                            {has("m") && <Shortcut keys={["M"]}>{text.helpMosaic}</Shortcut>}
                            {has("s") && <Shortcut keys={["S"]}>{text.helpSlideList}</Shortcut>}
                            {has("n") && <Shortcut keys={["N"]}>{text.notes}</Shortcut>}
                            {has("b") && <Shortcut keys={["B"]}>{text.helpProgress}</Shortcut>}
                            {has("f") && <Shortcut keys={["F"]}>{text.fullScreen}</Shortcut>}
                        </ShortcutGroup>
                    )}
                </div>
                <p className="mt-5 text-xs text-gray-500 dark:text-gray-400">{text.helpTouch}</p>
            </div>
        </div>
    );
}

export default Help;
