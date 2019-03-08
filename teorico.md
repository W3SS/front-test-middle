# Teórico

1\) Qual a diferença do operador `==` para o operador `===` em JavaScript?

[Resposta]
A diferença é que no caso de se utilizar '==' haverá uma coerção do valor para que ambos os lados da expressão tenham o mesmo tipo, no caso do '===' não haverá coerção. Sendo '==' verificador de igualdade por valor e '===' verificador por tipo.


1.1) Dê 2 exemplos de quando os operadores produziriam resultados diferentes

```js
// Resposta

// Já no caso do '===' não haverá coerção e por isso o código abaixo dará falso:

if(1 === '1')
    console.log('igual');
else
   console.log('diferente'); // Esta será a resposta

// Já se utilizarmos somente == haverá uma coerção para que ambos sejam o mesmo tipo e dará igual.

if(1 == '1')
    console.log('igual'); // Esta será a resposta
else
   console.log('diferente');

Outro exemplo:

if(0 == '')
    console.log('igual'); // Esta será a resposta
else
   console.log('diferente');
// No caso '' é considerado um valor false, que pode ser considerado falso mesmo não tendo o valor false.
// Já no caso abaixo é dada a mensagem correta, que são diferentes:

if(0 === '')
    console.log('igual');
else
   console.log('diferente'); // Esta será a resposta

```

---

2\) Recursos/Práticas:

2.1) Qual recurso do javascript é mais recomendado para tratar processamentos asíncronos? Justifique.

[Resposta]
A palavra reservada 'async' e a palavra reservada 'await' geralmente na forma de co-rotinas, as palavras-chave async e await permitem criar e usar Promises de forma mais "limpa" e mais parecida com outras linguagens. 

[Justificativa]
No exemplo abaixo a pequena implementação de uma função assícrona op2 de modo que a cadeia de dependências op1-op2 volte a ser estabelecida pelo escopo principal:
---- 

```js
async function op2(x)
{
	let n = Math.random();
	if (Math.random()  <= 0.25) {
		throw "op2 failed";
	}

	return Math.floor(x / 0.75 * 1000);
}

console.log("Start");

(async () => {
	try {
		let x = await op1();
		let res = await op2(x);
		console.log("Sucess: " + res)
	} catch (err) {
		console.log("Error: " + err)
	}
})();
```

Embora uma função async sempre retorne um objeto Promise nativo, pode-se fazer await em qualquer implementação de promessa. Qualquer objeto que possua o método .then() é aceito.

• A função passada a uma Promise pode ser async, por exemplo algo como:
----
```js
function op() { return new Promise(async (fulfill, reject) => {
	... código ...
});}
```

Exemplo: Registrando uma busca


• Suponha que desejamos buscar um URL e registrar a resposta como texto. Eis como isso fica usando promessas:
------
```js
function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}
```

• E aqui está a mesma coisa usando uma função assíncrona:
-------
```js
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}
```
---


2.2) Quais os recursos mais recomendados para incluir ícones em um site? Justifique.

[Resposta]
Isso varia muito de arquitetura para arquitetura, mas eu sempre recomendo e tento utilizar svg(quando são ícones específicos ou que não podem ser encontrados em libs open source) ou ícones de bibliotecas abertas(open source) como Font Awesome ou mesmo GlyphIcons. Se possivel com a lib encorporada ao projeto seja por meio de um package npm, por cdn interno ou por cdn externo(não recomendo pela imprevisibilidade do mantenedor do cdn externo, exemplo a empresa que disponibiliza o cdn decide tirar do ar aquele endereço isso gera falha do recurso, request error 404 no mínimo).

[Justificativa]
Utilizar ícones com imagens bitmap dificulta a responsividade do projeto, pois o bitmap é um conjunto de pixels (pontos) que carregam uma informação de cor, e é formado pela união desses pixels, já imagens em svg que são vetores podem ser redimensionadas para qualquer tamanho sem perder a qualidade. Sabendo disto utilizar dentro da aplicação as libs necessárias para a utilização de tais ícones é o essencial.

2.3) Qual recurso dos browsers é usado para carregar dados/conteúdos dinâmicos sem recarregar a página? Existem alternativas?

[Resposta]
Um recurso o Lazy Loading(ou carregamento tardio 'abrasileirando'), nos WebApps é constante seu uso principalmente quando se trata de SPA's que utilizam de poucas requests ao servidor com suas próprias configurações de routing e estratégias de nagevação diversas desde Url Providing(que simula a navegação nativa do browser) e até mesmo State Providing(explorando namespaces para chamar o conteúdo de determinado conteúdo), sua utilização funciona da seguinte forma antes dos states ou urls serem invocadas por algum trigger na aplicação são carregados anteriormente e armazenados localmente aguardando suas promises se resolverem e nisto podem ser carregadas controllers, services enfim qualquer recurso necessário para executar aquele trecho da aplicação. O Lazy Loading ainda é uma Promisse conceitualmente, o conceito Observable já se utiliza da estratégia Preloading muito utilizado em reactJS, vueJS e recentemente no Angular 2+ como estratégia principal de dynamic import.
Uma Promise processa um único evento quando uma operação assíncrona é concluída ou falha, já o Observable permite passar zero ou mais eventos onde o callback é chamado para cada evento. Muitas vezes Observable é preferido porque fornece as características de Promise e muito mais. Com Observable não importa se você deseja manipular 0, 1 ou vários eventos. Você pode utilizar a mesma API em cada caso. Ele também tem a vantagem de "ser" uma Promise cancelável.
Recentemente o RXJS que possui uma gama diversificada de métodos, adotou o conceito de Observable na sua versão 6, Por definição é uma coleção que funciona de forma unidirecional, ou seja, ele emite notificações sempre que ocorre uma mudança em um de seus itens e a partir disto podemos executar uma ação. Enquanto no $watch verificamos todo nosso escopo por alterações após cada $digest cycle(o que tem um grande custo na performance), com Observable esta verificação não acontece, pois para cada evento é emitida uma notificação para nosso Observable e então tratamos os dados. Nisto se o foco de um projeto é abordar uma estratégia reativa o Observable é o conceito ideal.

2.4) Qual recurso angular pode ser usado para aumentar a performance de campos que realizam algum processamento ao alterar o texto?

[Resposta]
Two-Way-Binding utilizando ng-model com event ustilizando o trigger input ou one-way-binding com a diretiva 'html-bind' usando a notação '::' como uma expressão one-time e a partir desse gatilho adicionando funcionalidade ao evento outra solução é reduzir o numero de watchers sabendo que o AngularJS gira completamente em torno de seu digest cycle. Sempre que um ciclo de digitação é acionado, ele percorre todas as ligações para detectar alterações no modelo. O tempo gasto em cada digest cycle pode ser reduzido reduzindo o número de watchers. Também reduz os rastros de memória do aplicativo.

2.5) Por quê é importante diminuir a quantidade de watchers do angular em uma página e como fazer?

[Resposta]
O AngularJS (versão 1.x) utiliza uma verificação muito poluída para acompanhar todas as alterações na app, o framework tem que passar por cada watcher para verificar se eles precisam ser atualizados, esse processo é chamado como digest (ciclo de digestão) do Angular JS. Toda vez que um evento maior ocorre em sua app (ex: quando a página é carregada pela primeira vez, quando ocorre uma nova requisição AJAX ou quando a URL muda) o Angular recebe as alterações e prepara uma digestão (digest). Essa digestão nada mais é que um loop interno que é rodado dentro de um membro chamado $scope. Apesar disto levar milissegundos, o AngularJS executa somente um processo por vez. Como resolver o problema ? A partir da versão 1.3 foi adicionado ao AngularJS uma notação "::" para permitir expressões constantes e evitar o disparo de watchers desnecessários. Expressões únicas pararão de recalcular uma vez que estejam estáveis, o que acontece após a primeira digest.


2.6) Por quê é importante evitar escopos isolados em diretivas do angular e como fazer?

[Resposta]
No objeto de definição de uma diretiva angular, temos a propriedade scope que pode se comportar de três formas de acordo com o seu valor:

☺ false|default: sem scope
Por padrão as diretivas não criam um escopo, ou seja, ela utiliza exatamente o mesmo escopo de onde ela for inserida, podendo modificar seus valores.

☺ true: novo scope
Quando definido como true é definido um novo scope, que herda (henraça prototipal) do scope pai.

☺ { foo: '=', bar: '@', baz: '&' }: isolate scope
O escopo isolado nos permite definir uma API via atributos HTML além de não herdar do escopo pai. Nossos atributos podem receber três valores diferentes que correspondem a como eles irão se comportar:

= two-way data-binding

@ top-down binding

& executar um método no escopo do pai

'Best Practice: Use the scope option to create isolate scopes when making components that you want to reuse throughout your app. 
John Papa "https://github.com/johnpapa/angular-styleguide"' 
---

Em si Isolated Scope é uma boa prática no angular para a reutilização de diretivas em outras partes da aplicação, e em si pode se comportar bem em praticamente tudo o que eu vi utilizando, o importante é iniciar esse novo scope por atribuição ou dependency injection para que ele herde os argumentos necessários para executar a finalidade à qual foi desenvolvido, mas se existe a necessidade de evitar um Isolated Scope não acredito que exista uma resposta coerente para evitar a utilização pois ele leva a uma componentização das diretivas, compartimentalização de suas funcionalidades e aumenta a manutenabilidade do código.

3\) CSS:

3.1) Por quê é importante não fazer seletores por tags html?

[Resposta]
Porque limita a customização de tais elementos, o que dificulta a aplicação das boas práticas do CSS ao código.
---

3.2) Para criar um site que desse a opção do usuário escolher um tema, qual tecnogia/recurso de css você utilizaria?

[Resposta]
A metodologia SMACSS para definir os temas de forma ordenada e organizada e Sass para organizar os diretórios com maior praticidade.
---

3.3) Quais práticas/recursos devem ser usados para criar sites responsivo?

[Resposta]
Media queries ainda são o melhor recurso atrelado à serviços de window detection ou mesmo a um observable de screen width. Também é válido o coinceito de fluid content mas como tambem agrega media queries, acaba sendo apenas mais uma ferramenta.
---


3.4) Quais metodologias CSS você costuma seguir? Explique um pouco delas.

[Resposta]
OOCSS -> a standard
---
Utilizo três que acredito ser as mais completas e que me permite abordar todos os tipos de projetos que trabalhei até hoje, são: 
---
• OOCSS que que torna o css em um objeto, e este objeto em questão é todo padrão visual que pode se repetir no projeto e é identificado através de uma classe. O estilo enfatiza a separação de propriedades de estrutura e de skin. Propriedades como background, color e border, quando fizerem parte da identidade visual do projeto, são consideradas parte do skin e devem ser agrupadas em classes próprias. 
---
SMACSS -> a complexa e favorita 
---
• O outro padrão(metodologia) que gosto de utilizar mas geralmente exige um pouco mais de planejamento é o SMACSS que nada mais é do que a separação de do CSS em Layers(camadas) que consistem em cinco categorias de regras CSS: base, layout, module, state e a pouco importante theme. As regras de base são as do tipo que não utilizam seletores com classes ou ids, as encontramos em um CSS Reset ou normalize.css. O sistema alerta sobre a agressividade dos CSS Resets mas não alerta sobre as regras deste tipo definidas no próprio projeto, ainda mais quando aplicadas a divs, spans ou headings. Regras cujos seletores não utilizam classes são globais e qualquer decisão tomada neste nível irá perpetuar por todo o projeto, por isso o planejamento tem que ser o primeiro passo para a implementação desse modelo. As categorias de layout e module são bastante semelhantes. O layout consiste em elementos agregadores e geralmente únicos como header, footer e sidebar. O sistema propõe que regras de layout tenham ids ou classes com o prefixo .l- como seletores.
As regras da categoria module englobam os demais componentes da página. O sistema não encoraja o uso de elementos nos seletores, preferindo .box .title ao invés de .box h2. Ainda, o seletores como .box-title são defendidos para facilitar a leitura do HTML e eu tbm prefiro desta forma para que as classes não sejam excessivamente extensas e tornem o HTML poluído ou pouco legível.
Assim como o OOCSS, o sistema repudia regras do tipo #sidebar .media onde a localização do elemento passa a ser relevante para sua apresentação. O SMACSS reforça que seja adicionada uma classe para abrigar as variações. O elemento da sidebar passa a ter a classe do módulo e também a do sub-módulo: <div class="media media-sidebar">. A categoria de state engloba regras responsáveis por gerenciar estado de componentes enquanto o usuário estiver navegando. Regras desta categorias são as únicas que podem e talvez precisem utilizar !important. O padrão indica que as classes possuam o prefixo .is-. Uso para validações e feedbacks tbm com classes como .isValid, .isInvalid, .isCollapsedOut, .isCollapsedIn, .isCurrent e etc. O SMACSS apesar de ser mais complexo é o que eu mais gosto de utilizar pois deixa todo o esquema de CSS muito bem organizado e se utilizado com Sass fica ainda melhor para organizar cada estilo e slice da aplicação. Assim como tbm pode ser organizado por arquivos separados com as regras de cada categoria como um arquivo layout.css por exemplo já é suficiente, o SMACSS é mais uma série de tutoriais de como escrever um bom código que propriamente um sistema de CSS.  . 
---
BEM -> a verbosa
---
• O BEM – sigla para block, element, modifier – é uma metodologia com várias versões cujo o preceito de esclarecer o desenvolvedor mais sobre o markup através de suas classes. o foco do BEM é que suas classes sejam auto explicativas e utilizadas para descrever tais classes contante que o objetivo desta classe esteja claro, para sistemas pequenos eu utilizo com liberdade já para sistemas maiores dou prioridade ao SMACSS ou mesmo o OOCSS, um exemplo de classes BEM é .report-graph__bar_size_big oferece em relação as tradicionais .bar, .report-graph-bar ou .graph-bar, o block é uma entidade independente da aplicação, podendo ser o mais alto nível de abstração (header, footer) ou componente (graph, tabs). O element é um descendente dependente de um block que possui uma certa função, para permitir nomes compostos e evitar ambiguidades, o padrão estabelece o controverso underscore("__") como separador. Desmembrando a classe report-graph__bar, identificamos bar como element e sabemos da existência do elemento pai report-graph, que é o block. O estilo define o modifier como uma propriedade de um block ou element que altera sua aparência. Desta maneira, o block .menu poderia ser acrescido da classe .menu_size_big, c om o uso de um underscore("_").
---

4\) Análise de código

4.1) Quanto tempo vai demorar para o código a seguir imprimir "finished"? Justifique. (Levando em consideração que `somePromise()` vai retornar uma Promise resolvida):

```js
function doSomething() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000)
    })
}

function doSomethingElse() {
    return new Promise(resolve => {
        setTimeout(resolve, 2000)
    })
}

somePromise()
    .then(() => {
        doSomething()
        doSomethingElse()
    })
    .then(() => {
        console.log('finished')
    })

```

[Resposta]
5 milisegundos.

[Justificativa]
Sempre que callbacks disparadas por um temporizador criarem outro temporizador, este terá tempo mínimo de 4 milissegundos.
---
```js
setTimeout(function() {
    // do something
    setTimeout(function() {
        // do second thing
    }, 1000);
}, 1000);
```
esta função acima geraria um timeout em chain.
-----

4.2) O que o código a seguir imprime? (Levando em consideração que `somePromise()` vai retornar uma Promise resolvida)

```js
somePromise()
    .then(() => {
        throw new Error('uh oh!')
    }, err => {
        console.log(err.message)
    })
    .then(() => {
        console.log('ok now!')
    })
```

[Resposta] 
'uh oh!'

[Justificativa]
A declaração throw lança uma exeção definida pelo utilizador. A execução da função atual irá parar (os comandos depois de throw não serão executados), e o controle será passado para o primeiro bloco 'catch' no conjunto de chamadas. Se não existir nenhum bloco 'catch' entre as funções de caller, o programa irá terminar.

4.3\) Quais as vantagens/desvantagens da segunda função em relação a primeira?

```js
function doSomething(options) {
    return fetch(options.url).then(r => r.json())
}

async function doSomethingAsync(options) {
    return fetch(options.url).then(r => r.json())
}
```

[Resposta]
A segunda opção não precisa de uma função anônima para lidar com a resposta, o código não precisa ficar aninhado pois em si ela já produz um resultado e facilita inclusive o tratamento de erros dentro de si, podendo criar inclusive blocos de análise try/catch, e pela função se resolver apenas nessas linhas poupa a escrita de mais linhas para complementar sua execução.
---

5\) Quais as vantagens de usar ES modules em vez de usar commonjs?

[Resposta]
Modularização no desenvolvimento de software é algo imprescindível.
Por menos complexidade que um sistema possua, a divisão em pequenas partes de código garante a escalabilidade da aplicação, além de muitos outros benefícios.
Esta é a parte mais importante: qualquer um é capaz de criar módulos (também conhecidos como bibliotecas). Para citar Isaac Schlueter (do projeto node.js): "Escreva pequenos módulos em que cada um faça uma coisa e monte-os em outros módulos que façam uma coisa maior. Você não pode entrar em um callback hell se não for lá."
A modularização tambem permite a exportação de blocos de código de determinadas funcionalidades reforçando o DRY, deixando mais limpo organizado e aperfeiçoando a manutenção do código. Desse modo, centenas de frameworks foram construídos, compartilhados e combinados, como num lego, com o objetivo de alavancar o desenvolvimento de sistemas complexos com um esforço relativamente reduzido frente ao que seria necessário para construí-los inteiramente do zero. 
---

6\) Cite as principais diferenças entre um componente e uma diretiva no AngularJS.

[Resposta]
O Component é uma Directive especial, ele foi criado para suprir e corrigir problemas que a directive possui quando se quer criar um componente html que possui um controller e um html proprio, esses problemas seriam: não possui bindings, não possui scope isolado e ambiguidades geradas pelas especificações das directives do tipo link e atributo.
---
Se deve usar um Component: Sempre que quiser criar um componente html de scopo isolado (substitui a criação de um html com binding via ng-controller de um controller).
---
Se deve usar uma Directive: Apenas quando se quer criar um atributo que executa algum javascript de manipulação de DOM ou manipulação simples de informação.