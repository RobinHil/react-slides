# Diapositives

## Presentation

`<Presentation>` contient les diapositives, dans l'ordre de la présentation, et les réglages qu'elles partagent. Une diapositive accepte n'importe quel contenu : un composant dans son propre fichier ou des éléments écrits sur place. Les diapositives peuvent être groupées dans des fragments (`<>...</>`) ou construites avec `map`.

| Prop | Défaut | Rôle |
| --- | --- | --- |
| `theme` | `themes.light` | Thème de la présentation, ses autres props passant par-dessus, voir [thèmes](themes.md#themes) |
| `size` | `{ width: 1920, height: 1080 }` | Taille de référence des diapositives, pour une présentation en 4:3 ou en portrait |
| `lang` | anglais | Langue des diapositives et des notes, comme `"fr"` |
| `font` | `"sans"` | Police de toutes les diapositives |
| `headingFont` | la police du texte | Police des titres |
| `color` | `"black"` | Couleur du texte |
| `background` | `"white"` | Couleur ou dégradé de toutes les diapositives |
| `accentColor` | `"#0891b2"` | Couleur de la barre de progression et de la miniature en cours, toute couleur CSS |
| `codeTheme` | `"dark"` | Thème des blocs de code, `"dark"` ou `"light"` |
| `diagramTheme` | `"light"` | Thème des diagrammes, `"light"`, `"dark"` ou tout thème Mermaid |
| `corners` | aucun | En-têtes et pieds de page de toutes les diapositives, voir [coins](corners-and-notes.md) |
| `transition` | `"fade"` | Transition entre les diapositives : `"fade"`, `"slide"` ou `"none"` |
| `printSteps` | `false` | Imprimer une page par étape plutôt qu'une page par diapositive |

## Slide

Les props de `<Slide>` changent une diapositive, par-dessus les réglages de la présentation :

| Prop | Rôle |
| --- | --- |
| `theme` | Thème de la diapositive, par-dessus celui de la présentation |
| `background` | Couleur ou dégradé de la diapositive |
| `font`, `headingFont`, `color`, `codeTheme`, `diagramTheme` | Polices, couleur du texte, thèmes du code et des diagrammes |
| `corners` | Coins remplaçant ceux de la présentation, ou `false` pour tous les masquer |
| `notes` | Notes de l'orateur, en Markdown |
| `transition` | Transition qui mène à cette diapositive |

```jsx
<Slide background="slate-800" font="lora"><Chapter /></Slide>
<Slide background={["sky-100", "violet-200"]} notes="Rester bref.">
    <Summary />
</Slide>
```

## S'adapter à l'écran

Les diapositives sont mises en page à leur taille de référence, 1920×1080 par défaut, puis mises à l'échelle d'un bloc à l'écran. Choisissez les tailles de police et d'image comme pour un écran 1080p : elles restent proportionnées sur un portable, un projecteur ou un téléphone. Une diapositive qui contient plus qu'elle ne peut, un long texte ou un grand tableau, est réduite juste assez pour tenir au lieu de déborder, et les images qui reçoivent la place restante grandissent pour la remplir.

Une diapositive en erreur affiche son erreur à sa place, et le reste de la présentation continue de fonctionner.

## Une diapositive dans son propre fichier

Une diapositive dans son propre fichier est un simple composant :

```jsx
import { CenterLayout, Heading, Paragraph } from '../../components/index.jsx';

/** Opening slide of the talk. */
function Intro() {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">Mon exposé</Heading>
            <Paragraph fontSize="3xl" align="center">Un sous-titre</Paragraph>
        </CenterLayout>
    );
}

export default Intro;
```

Tous les composants viennent de `src/components/index.jsx` ; `Presentation` et `Slide` de `src/interface/index.jsx`.
