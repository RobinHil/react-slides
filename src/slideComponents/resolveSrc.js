// Les diapositives designent leurs images par un chemin absolu ("/chat.jpg"),
// commode a ecrire mais faux des que le site n'est pas servi a la racine du
// domaine - le cas sur GitHub Pages, ou il vit sous /react-slides/. On resout
// donc le chemin contre la base du build, qui vaut "/" en developpement.
//
// Les deux chemins de rendu d'image passent par ici : le composant Image, et
// le rendu Markdown, ou une image s'ecrit ![alt](/fichier.svg) et n'a aucune
// raison d'etre traitee differemment.
export default function resolveSrc(src) {
    if (!src || /^([a-z]+:)?\/\//.test(src) || src.startsWith('data:')) return src;
    return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
}
