import Heading from "../slideComponents/content/Heading";
import Paragraph from "../slideComponents/content/Paragraph";
import Image from "../slideComponents/content/Image";
import List from "../slideComponents/content/List";
import Markdown from "../slideComponents/content/Markdown";

function Slide1() {
    return (
        <>
            <Heading align="center">Titre slide 1</Heading>
            <Heading fontSize={3}>Sous-titre 1</Heading>
            <Heading fontSize={1} align="right">Sous-sous-titre 1</Heading>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non lorem velit. Aliquam sodales sed mi non commodo. Nunc rhoncus ligula id dui euismod aliquet ut id mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vulputate vestibulum urna. Curabitur justo mauris, interdum a tellus ut, vulputate bibendum turpis. Sed imperdiet suscipit felis sed fermentum. Quisque vestibulum congue mauris nec varius. Aliquam tempus, nisl tincidunt condimentum luctus, est mi posuere nisl, sed dictum tortor justo vitae velit. Nam tristique lobortis metus, eu tristique diam ultricies quis. Cras ullamcorper eros quis mauris accumsan, vitae lobortis tellus congue. Donec eu metus et urna pulvinar faucibus. Vivamus id nunc vitae eros eleifend feugiat id varius justo. Praesent vitae feugiat nibh.

Mauris ultrices posuere tellus id vehicula. Nam lectus ligula, congue quis laoreet eget, vehicula at lorem. Etiam vel pretium mauris. Ut et orci non enim hendrerit maximus. Praesent commodo vehicula elementum. Curabitur et bibendum lacus. Quisque magna tellus, egestas a hendrerit ac, finibus vitae nibh. Maecenas consequat lacus eget egestas tincidunt. Praesent eget efficitur diam.

Sed ornare libero lectus, nec rhoncus nibh tristique sit amet. Nullam nisl nulla, feugiat id est at, ultrices dignissim ante. Fusce imperdiet purus volutpat, vestibulum ante quis, ullamcorper felis. Duis non volutpat diam, vel mollis massa. Phasellus non gravida lectus, sit amet sagittis dolor. Nam tristique malesuada justo, vitae lacinia felis. Nulla ultricies, sem sed luctus auctor, nunc est dictum nisl, dictum porttitor diam purus quis erat. Phasellus finibus nulla convallis eros pretium, nec sollicitudin purus sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc pulvinar porta est, luctus dictum erat semper a.

Praesent fermentum semper commodo. Nullam ullamcorper interdum sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur tortor purus, congue ac egestas ut, molestie vitae nulla. Nam sit amet tincidunt metus. Donec et porttitor nisl. Integer eu congue augue. Duis sit amet nisi vitae mauris convallis tristique id ut turpis.

Aliquam in dolor molestie, pellentesque est sed, tincidunt ante. Suspendisse vitae mi commodo, fringilla metus a, pulvinar ante. Aenean sodales egestas consectetur. Vestibulum ut arcu justo. Aliquam lorem massa, vestibulum vitae egestas ac, accumsan non libero. Mauris euismod lorem tellus, ac consectetur risus vulputate et. Fusce posuere, justo at tincidunt bibendum, lectus nisl fringilla quam, nec consequat elit erat non orci.

Proin sit amet felis ut felis maximus euismod. Proin et lorem vitae quam rhoncus gravida et fringilla nibh. Proin interdum lacus id purus tincidunt cursus. Etiam finibus sem urna, sed consectetur arcu posuere in. Quisque nec iaculis neque, eu iaculis dolor. Duis ut ex tempor, rhoncus nisi vel, malesuada nisl. Duis ut metus sit amet est condimentum dignissim. Nulla tristique interdum ex. Fusce mattis ac lorem vel efficitur. Etiam est odio, viverra a posuere ac, feugiat in odio. Aliquam faucibus cursus lacus. Cras scelerisque facilisis est, quis varius massa tristique vel. Morbi orci dui, malesuada nec vulputate at, hendrerit et neque. Quisque ante turpis, faucibus sed felis a, tincidunt aliquam est. Fusce dictum suscipit arcu nec imperdiet. Praesent suscipit nisi vestibulum erat hendrerit, vitae hendrerit lorem mollis.

Maecenas ut diam et leo fermentum varius. Nunc a ex auctor, molestie mi vitae, pharetra velit. Praesent ut porta nulla. Curabitur interdum finibus ex ut condimentum. Sed vitae elit scelerisque, suscipit nibh eu, rhoncus ipsum. Maecenas volutpat vel leo at lobortis. Vestibulum purus libero, dapibus ac tincidunt id, imperdiet eget turpis. Praesent hendrerit enim risus. Sed metus elit, finibus non elit in, congue porttitor tellus. Morbi commodo metus odio, sit amet suscipit quam ornare non.

Pellentesque habitant morbi tristique senectus et netus et malesu ada fames ac turpis egestas. Quisque ornare eu mauris quis suscipit. Donec vehicula nibh turpis, euismod eleifend neque rhoncus in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at justo sed risus luctus tincidunt ac vitae eros. Nunc euismod ullamcorper turpis, sit amet venenatis elit venenatis at. Nam non vestibulum mauris. Morbi aliquam, mauris vel blandit accumsan, augue nunc molestie tellus, id lacinia ligula orci vitae ligula. Vestibulum sed placerat tortor, id volutpat dui. Sed eget dui lorem. Maecenas varius magna sapien, vitae dapibus augue convallis vitae. Vivamus ipsum ex, pretium sit amet feugiat non, condimentum in felis. Sed sagittis ligula id porta tincidunt. Donec nec nisl dolor. Vestibulum vitae mattis risus.

Integer est justo, dapibus eget vulputate in, interdum at sapien. Vestibulum auctor rutrum tortor. Nullam convallis augue eu ante faucibus, sed porttitor ipsum consequat. Suspendisse porttitor, risus nec scelerisque mollis, eros augue consectetur urna, eu dignissim massa felis sit amet lacus. In et dictum arcu. Donec malesuada mauris sed tellus sagittis condimentum. Quisque tincidunt elit id velit bibendum sodales. Sed auctor nisl et augue blandit aliquam. Nulla porttitor, est mollis porttitor rhoncus, ex mi finibus lorem, at ultrices dui dui sed justo. Donec sed elit et velit dapibus fringilla. Donec sollicitudin ut tellus eget congue.

Fusce eu magna leo. Aliquam congue sapien eget laoreet luctus. Morbi vitae rutrum sem. Ut eleifend lacinia ipsum ut tempor. Donec nec mollis turpis. Aenean pretium viverra odio, quis ullamcorper nibh pellentesque et. Maecenas iaculis nisl non nisi ornare fermentum. Aenean vel blandit nisl. Pellentesque ornare tristique augue, at dignissim enim eleifend eget. Nulla malesuada odio in tellus ultricies, vel pulvinar lectus consequat. Vestibulum suscipit quam nisi, a dapibus turpis feugiat in. Fusce gravida nisi purus, vitae ultricies lacus consequat vel. Etiam a quam et dui porta imperdiet vel ut nunc. Proin tortor urna, pretium sit amet orci eget, lacinia commodo purus. Sed quis semper est, a dictum lectus. Praesent viverra elit et tristique posuere.

Integer eleifend tortor in nisl vestibulum, sed aliquam tellus molestie. Fusce in lorem molestie, fringilla lorem eget, vulputate lectus. Phasellus malesuada tempor consectetur. Nunc vel arcu ipsum. Morbi et maximus ipsum. Suspendisse auctor nisl et mi auctor tincidunt. Aliquam pharetra, nisl quis laoreet imperdiet, erat ipsum interdum velit, a tempor nulla velit vel lacus. Morbi fringilla dolor at neque gravida cursus. Integer molestie gravida nisl, ac sodales quam rhoncus sit amet. Vivamus pretium nisl sem. Sed vitae turpis quis orci euismod aliquam a sit amet mi. Nulla volutpat neque vitae ultrices molestie.

Nulla tincidunt, velit sed malesuada hendrerit, mauris nisl suscipit odio, vel tempus sapien nulla sed libero. Maecenas lobortis suscipit neque. Donec quis turpis tellus. Maecenas vulputate nec nulla eu tristique. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam ultricies eros ultricies lacus convallis, ac pulvinar nunc feugiat. Proin viverra ligula in nisl imperdiet, at sagittis dui tempus. Curabitur fermentum pulvinar aliquet. Mauris semper felis nisi, id sodales nisi imperdiet nec. Proin sit amet orci sit amet neque bibendum malesuada. Proin fringilla erat nec semper molestie. Curabitur id tellus vel risus eleifend ultricies. Aenean hendrerit ultricies sodales. Integer dapibus nisl sed tellus volutpat, sed vulputate mauris rutrum. Vivamus elementum eu urna sit amet placerat. Pellentesque euismod volutpat lacus sed maximus.

Cras at tellus et nulla vulputate commodo eu ut sem. Sed imperdiet, mauris vitae porttitor finibus, tellus lacus gravida sem, vitae fermentum risus mauris sit amet ipsum. Nulla arcu tortor, euismod eget urna eu, facilisis vestibulum augue. Duis vulputate leo tellus, nec finibus neque iaculis eu. Ut ac tortor eu velit dictum aliquet vulputate eu lorem. Nulla facilisi. Sed lacinia, sem et viverra semper, massa magna fermentum nunc, eu elementum ipsum mauris in odio. In nisi odio, tincidunt eu mi ac, malesuada condimentum nisi. Aenean convallis risus eros, eu facilisis metus lobortis non. Suspendisse ut interdum risus, nec rutrum ipsum. Donec volutpat velit erat, eu varius neque lobortis a. Nunc egestas tellus id est eleifend, sed tincidunt felis sagittis. Vestibulum fringilla sapien non condimentum consequat. Donec et laoreet diam. Proin nec mauris dignissim, tempus lectus sed, gravida massa. Donec sodales, dui a tempor egestas, neque erat bibendum erat, at placerat turpis mauris ac massa.

Nullam sit amet lectus vestibulum, luctus sem sit amet, euismod risus. Fusce id risus lobortis, vehicula ligula in, laoreet leo. Donec non porta dui. Proin finibus ut urna at egestas. Mauris aliquam ut justo et luctus. Morbi pretium nibh ac velit semper, eget rutrum nibh bibendum. Etiam non tortor commodo, porttitor magna at, blandit leo. Aliquam luctus imperdiet metus at condimentum. Phasellus ac elit nec justo pellentesque pharetra a id ante. Mauris id massa id tellus blandit ornare sit amet id ante. Sed a viverra quam, vel vestibulum nunc. Ut dictum urna ac dictum tincidunt. Phasellus semper est sed leo auctor aliquet. Morbi rutrum nunc eget odio rhoncus suscipit.

Nam scelerisque lorem dapibus, sodales nunc eget, pulvinar mauris. Curabitur ac nulla interdum, pharetra turpis vitae, blandit nibh. Curabitur sit amet sapien eu turpis commodo imperdiet. Morbi pellentesque ornare neque, quis maximus sapien aliquet id. Curabitur scelerisque tellus magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent dapibus justo et velit vulputate, ac pretium ligula tempor. Nunc vitae aliquet metus, quis mattis purus. Fusce sollicitudin venenatis efficitur.
            </Paragraph>
            <Image src="/favicon.svg" alt="Une image" align="center" />
            <Image src="/favicon.svg" alt="Une image2" align="right" />
            <Image src="/favicon.svg" alt="Une image avec légende">
                lala lala la légende
            </Image>
            <br/>
            <List list={ ["test", "de", "bulleted", "list"] } fontSize={1}/>
            <br/>
            <List list={ ["test", "de", "numbered", "list"] } type="numbered" />

            <Markdown>
{`
# Titre principal

Ceci est un paragraphe en **Markdown**!

## Sous-titre

- Une liste
- Avec quelques éléments
    - Un sous-élément
    - Un autre sous-élément
- Un autre élément

### Un peu de code

\`\`\`javascript
const example = "Ceci est un exemple de code";
console.log(example);
\`\`\`

### Liens

Voici un [lien vers Google](https://www.google.com).

### Citations

> Ceci est une citation.

### Images

![Image alt text](https://via.placeholder.com/150)

### Texte mis en forme

*Italique*

**Gras**

### En-têtes de différentes tailles

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

### Listes numérotées

1. Premier élément
2. Deuxième élément
3. Troisième élément

### Listes imbriquées

- Premier niveau
  - Deuxième niveau
    - Troisième niveau
`}
            </Markdown>
        </>
    );
}

export default Slide1;