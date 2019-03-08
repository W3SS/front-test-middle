# Prático

1\) Adicione o método `.last()` na classe `Array`, que retornará o último item do array, ou `undefined` caso o array estiver vazio

```js
// Resposta
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

// Teste/Exemplos
const array1 = [1,2,3,4,5,6,7,8,9]
console.log(array1.last()) //9

const array2 = []
console.log(array2.last()) //undefined
```

---

2\) Melhore a função a seguir:

```js
function getTransactions() {
    return $q((resolve, reject) => {
        $http.get(BASE_URL + '/api/transacoes')
            .then(response => {
                if (!response.data.error) {
                    const transactions = response.data

                    var _transactions = []

                    for (var i in transactions) {
                        if (transactions[i].realizada)  {
                            _transactions.push({
                                id: transactions[i].id,
                                value: transactions[i].valor,
                                type: transactions[i].valor < 0 ? 'transference' : 'deposit',
                            })
                        }
                    }

                    resolve(_transactions)
                } else {
                    reject(response.data.error)
                }
            })
            .catch(e => reject(e))
    })
}
```

```js
// Resposta
const fetch = require('node-fetch');

const getTransactions = async () => {
	try {
		const response = await fetch(BASE_URL + '/api/transacoes');
		const data = await response.json();
        const transactions = data

        let _transactions = []

        for (let i in transactions) {
            if (transactions[i].realizada)  {
                _transactions.push({
                    id: transactions[i].id,
                    value: transactions[i].valor,
                    type: transactions[i].valor < 0 ? 'transference' : 'deposit',
                })
            }
        }

		return _transactions;
	} catch(err) {
		console.log(err)
	}
}
```

---

3\) Identifique problemas nos trechos de html/angular a seguir e corrija:

3.1)
```html
<img src="{{item.img}}">
```

[Problemas]
Sem a identificação dadiretiva angular ng o html não reconheceria a notação "{{}}" nisto não encontraria a referência ao arquivo dinâmicamente e sim buscaria por uma string com o seguinte nome "{{item.img}}" com a diretiva angular ele busca pelo item.img no scope da controller deste mesmo html. 

```html
<!-- correção -->
<img ng-src="{{item.img}}"/>
```

3.2)
```html
...
<body ng-controller="PageCtrl">
    <h1>{{page.mainTitle}}</h1>
    ...
</body>
```

[Problemas]
Para que várias controllers sejam adicionadas é ideal que a tag body receba a aplicação e não uma controller e por boa prática é recomendado usar a sintaxe controllerAs ao invés do convencional controller com $scope, Controllers são construídos, "iniciados", e fornecem um nova instância única, e a sintaxe controllerAs é mais próxima de um construtor JavaScript do que a sintaxe clássica do $scope. Isso promove o uso do binding de um objeto "pontuado", ou seja, com propriedades na View (ex. customer.name ao invés de name), que é mais contextual, legível, e evita qualquer problema com referências que podem ocorrer sem a "pontuação". Por que? Porque ajuda a evitar o uso de chamadas ao $parent nas Views com controllers aninhados.

```html
<!-- correção -->
<body ng-app="app">
    <div ng-controller="PageCtrl as page">
     <h1>{{page.mainTitle}}</h1>
        ...
    </div>
</body>
```

3.3)
```html
...
<body ng-controller="NewsletterCtrl">
    <div class="box">
        <p>Cadastre-se na nossa news semanal!</p>
        <input ng-model="email" type="email">
        <button ng-click="email && registerNewsletter(email)">
            Cadastrar
        </button>
    </div>
    ...
</body>
```

[Problemas]
Ignorando o fato da controller estar diretamente na tag body que é uma má prática, é ideal que os métodos sejam chamados de um arquivo js, e nunca no scope da view nisto ao invés do código acima o ideal seria ter dois arquivos com os seguintes blocos de código.

```html
<!-- correção -->
<body ng-controller="NewsletterCtrl as newsletter">
    <div class="box">
        <p>Cadastre-se na nossa news semanal!</p>
        <input ng-model="newsletter.email" type="email">
        <button ng-click="registerNewsletter()">
            Cadastrar
        </button>
    </div>
    ...
</body>
```

```js
function NewsletterCtrl() {
    var vm = this;
    vm.email = 'bar'
    vm.registerNewletter = function() {  
        // função para registrar o e-mail no banco de dados
    };
}
```

3.4)
```js
function HomeCtrl($scope) {
    $scope.foo = 'bar'
}
```

[Problemas]
Ao utilizar a sintaxe controllerAs ao invés da sintaxe clássica controller com $scope. A sintaxe controllerAs usa o this dentro dos controllers que fica ligado ao $scope. A palavra-chave this é contextual e quando usada em uma função dentro de um controller pode mudar seu contexto. Capturando o contexto do this evita a ocorrência deste problema. Nisto para seguir as boas práticas é ideal que sejam utilizadas as duas convenções num método controller.

```js
// correção
function HomeCtrl() {
    var vm = this;
    vm.foo = 'bar'
}
```

---

4\) Na pasta [src](./src), crie uma aplicação web:

4.1) Buscar os dados do endpoint:
https://5ba412108da2f20014654cf8.mockapi.io/api/v1/flights

4.2) Implementar a listagem de voos (tela "My bookings"):

![Layout](https://mir-s3-cdn-cf.behance.net/project_modules/1400/f21c0250028109.58ced3cbd06b1.jpg)
