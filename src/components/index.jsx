import { lazy } from 'react';
import Card from './Card.jsx';
import CenterLayout from './CenterLayout.jsx';
import ColorSwatch from './ColorSwatch.jsx';
import GridLayout from './GridLayout.jsx';
import Heading from './Heading.jsx';
import Image from './Image.jsx';
import Link from './Link.jsx';
import List from './List.jsx';
import Paragraph from './Paragraph.jsx';
import RowLayout from './RowLayout.jsx';
import Step from './Step.jsx';
import Table from './Table.jsx';
import Text from './Text.jsx';
import TwoColumnLayout from './TwoColumnLayout.jsx';
import Video from './Video.jsx';

const Code = lazy(() => import('./Code.jsx'));
const Markdown = lazy(() => import('./Markdown.jsx'));
const Diagram = lazy(() => import('./Diagram.jsx'));
const Formula = lazy(() => import('./Formula.jsx'));

export { Card, CenterLayout, Code, ColorSwatch, Diagram, Formula, GridLayout, Heading, Image, Link, List, Markdown, Paragraph, RowLayout, Step, Table, Text, TwoColumnLayout, Video };
