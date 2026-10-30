import { CenterLayout, Heading, Paragraph, TwoColumnLayout, List } from '../../components/index.jsx';

/** One example of a list, under its title and its explanation. */
function ListExample({ title, explanation, children }) {
    return (
        <CenterLayout>
            <Heading level={2} fontSize="5xl" align="center">{title}</Heading>
            <br /><br />
            {explanation}
            {children}
        </CenterLayout>
    );
}

/** Slide presenting bulleted and numbered lists, their styles and alignments. */
function Lists({ text }) {
    const [bullets, bulletsText] = text.bullets;
    const [numbers, numbersText] = text.numbers;
    const [styles, stylesText] = text.styles;
    const [alignments, alignmentsText] = text.alignments;
    const [bold, underlined, italic, struck, ...styled] = text.styled;

    return (
        <CenterLayout>
            <Heading align="center" fontSize="8xl">{text.title}</Heading>
            <br /><br />
            <br /><br />
            <br /><br />
            <TwoColumnLayout
                leftContent={<TwoColumnLayout
                    leftContent={<ListExample title={bullets} explanation={<Paragraph align="justify">{bulletsText}<br /><br />{text.example}</Paragraph>}>
                        <br />
                        <List list={text.items} type="bulleted" />
                    </ListExample>}

                    rightContent={<ListExample title={numbers} explanation={<Paragraph align="justify">{numbersText}<br /><br />{text.example}</Paragraph>}>
                        <br />
                        <List list={text.items} type="numbered" />
                    </ListExample>}
                />}

                rightContent={<TwoColumnLayout
                    leftContent={<ListExample title={styles} explanation={<Paragraph align="justify">{stylesText}<br /><br />{text.example}</Paragraph>}>
                        <br />
                        <List list={[
                            <b key="bold">{bold}</b>,
                            <u key="underlined">{underlined}</u>,
                            <i key="italic">{italic}</i>,
                            <s key="struck">{struck}</s>,
                            ...styled
                        ]} type="bulleted" fontSize="xl" bg="blue-300" color="red-700" />
                    </ListExample>}

                    rightContent={<ListExample title={alignments} explanation={<Paragraph align="justify">{alignmentsText}<br /><br />{text.left}</Paragraph>}>
                        <List list={[text.items[0], "..."]} type="bulleted" />
                        <br />
                        <Paragraph align="justify">{text.right}</Paragraph>
                        <List list={[text.items[1], "..."]} type="bulleted" align="right" />
                        <br />
                        <Paragraph align="justify">{text.center}</Paragraph>
                        <List list={[text.items[2], "..."]} type="bulleted" align="center" />
                    </ListExample>}
                />}
            />
        </CenterLayout>
    );
}

export default Lists;
