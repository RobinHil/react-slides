import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useLabels } from './hooks.js';
import { usePrint } from '../contexts/Print.context.jsx';

/** Exports the whole deck to PDF through the print dialog of the browser. */
function PrintButton() {
    const { isPrinting, print } = usePrint();
    const text = useLabels();

    return (
        <ToolbarButton
            icon={<Icon icon={faFilePdf} />}
            label={isPrinting ? text.preparingPdf : text.exportPdf}
            onClick={print}
            shortcut="p"
        />
    );
}

export default PrintButton;
