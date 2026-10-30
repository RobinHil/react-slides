import { useLayoutEffect } from 'react';
import { useSteps } from '../contexts/Steps.context.jsx';

/** Content revealed at one step of its slide, keeping its room on the slide until then; steps follow the page unless given an order. */
function Step({ children, order, as: Tag="div", className="" }) {
    const { refresh } = useSteps();

    useLayoutEffect(() => {
        refresh();
        return refresh;
    }, [refresh, order]);

    return (
        <Tag
            data-step=""
            data-step-order={order}
            className={`invisible opacity-0 translate-y-[0.4em] transition-[opacity,translate,visibility] duration-500 ease-fluid data-[shown=true]:visible data-[shown=true]:opacity-100 data-[shown=true]:translate-y-0 ${className}`}
        >
            {children}
        </Tag>
    );
}

export default Step;
