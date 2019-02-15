# Chapter 3 : Vue 인스턴스

## 3.1 el, data, computed 옵션

```angular2html
// 예제 03-01
   <div id="test">
       {{name}}
   </div>
   <script type="text/javascript">
   var model = {
       name : "홍길동"
   }
   var vm = new Vue({
       el: '#test',
       data: model
   })
</script>
```

```angular2html
// 예제 03-02 : 예제 02-13 소환
<script type="text/javascript">
//1부터 입력된 숫자까지의 합구하기
var vmSum = new Vue({
    el: "#example",
    data: {num: 0},
    computed: {
        sum: function() {
            var n = Number(this.num);
            if (Number.isNaN(n) || n < 1) return 0;
            return ((1+n) * n) / 2;
        }
    }
})
</script>
```

```angular2html
// 예제 03-03: 계산형 속성의 getter/setter 메서드
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>03-02</title>
<script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</head>
<body>
<div id="example">
    금액 : <span>{{amount}}원</span>
</div>
<script type="text/javascript">
var vm = new Nue({
    el: "#example",
    data: {amt : 1234567},
    computed: {
        amount: {
            get: function() {
                var s = new String(""+this.amt);
                var result = "";
                var num = 0;
                for (var i=s.length-1;i>=0;i--){
                    result = s[i] + result;
                    if (num % 3 == 2 && i !== 0)
                        result = "," + result;
                    num++;
                }
                return result;
            },
            set: function(amt) {
                if (typeof(amt) === "string") {
                    var result = parseInt(amt.replace(/,/g, ""))
                    if (isNaN(result)) {
                        this.amt = 0;
                    } else {
                        this.amt = result;                    
                    }
                } else if (typeof(amt) === "number") {
                    this.amt = amt;
                }
            }
        }
    }
})
</script>
</body>
</html>
```

## 3.2 메서드

```angular2html
// 예제 03-04 : 예제 03-02를 메서드 사용으로 변경
<div id="example">
    <input type="text" v-model="num" /><br />
    1부터 입력된 수까지의 합 : <span>{{sum()}}</span>
</div>
<script type="text/javascript">
//1부터 입려된 수까지의 합구하기
var vmSum = new Vue({
    el: "#example",
    data: {num: 0},
    methods: {
        sum: function() { // note: 내부에 this를 사용하는 함수는 es6 arrow function을 사용하지 않도록 주의해야한다.
            var n = Number(this.num);
            if (Number.isNaN(n) || n < 1) return 0;
            return ((1+n) * n) / 2;
        }
    }
})
</script>
```

## 3.3 관찰 속성

```angular2html
// 예제 03-05
<div id="example">
    x: <input type="text" v-model="x"><br>
    y: <input type="text" v-model="y"><br>
    덧셈 결과 : {{sum}}
</div>
<script type="text/javascript">
var vm = new Vue({
    el: "#example",
    data: {x:0, y:0, sum:0},
    watch: {
        x: function(v) {
            console.log("## x 변경");
            var result = Number(v) + Number(this.y);
            if (isNaN(result)) {
                this.sum = 0;                
            } else {
                this.sum = result;
            } 
        },
        y: function(v) {
            console.log("## y 변경");
            this.y = v;
            var result = Number(this.x) + Number(v);
            if (isNaN(result)) {
                this.sum = 0;
            } else {
                this.sum = result;
            }
        }
    }
})
</script>
```

```angular2html
// 예제 03-06
<script type="text/javascript">
var vm = new Vue({
    el: "#example",
    data: {x:0, y:0},
    computed: {
        sum: function() {
            var result = Number(this.x) + Number(this.y);
            if (isNaN(result)) {
                return 0;
            } else {
                return result;
            }
        }
    }
})
</script>
```

```angular2html
// 예제 03-07 : HTML 기본 틀
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>03-07</title>
</head>
<body>
<div id="example">

</div>
<script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js"></script>
<script type="text/javascript">


</script>
</body>
</html>
```

```angular2html
// 예제 03-08 : 나머지 코드 추가
// head 안쪽에 스타일을 정의합니다
<style>
    #list {width: 600px; border:1px solid black; border-collapse:collapse;}
    #list td, #list th {border:1px solid black; text-align:center;}
    #list > thead > tr {color:yellow; background-color:purple;} 
</style>

// id가 example인 요소 내에 작성합니다
<div id="example">
    <p>
    이름 : <input type="text" v-model="name" placeholder="두자 이상 입력하세요" />
    </p>
    <table id="list">
        <thead>
            <tr>
                <th>번호</th><th>이름</th><th>전홥너호</th><th>주소</th>
            </tr>
        </thead>
        <tbody id="contacts">
            <tr v-for="contact in contactlist">
                <td>{{contact.no}}</td>
                <td>{{contact.name}}</td>
                <td>{{contact.tel}}</td>
                <td>{{contact.address}}</td>
            </tr>
        </tbody>
    </table>
    <div v-show="isProcessing === true">조회중</div>
</div>
```

```angular2html
// 예제 03-09 : script 내에 작성할 vue 객체
<script type="text/javascritp">
var vm = new Vue({
    el: "#example",
    data: {
        name: "",
        isProcessing: false,
        contactlist: []
    },
    watch: {
        name: function(val) {
            if (val.length >= 2) {
                this.fetchContacts();
            } else {
                this.contactlist = [];
            }
        }
    },
    methods: {
        fetchContacts: _.debounce(function(){
            this.contactlist = [];
            this.isProcessing = true;
            var url = "http://sample.bmaster.kro.kr/contacts_long/search/" +_ this.name;
            var vm = this;
            fetch(url)
                .then(function(response) {
                    return response.json()
                }).then(function(json) {
                    vm.contactlist = json;
                    vm.isProcessing = false;
                }).catch(function(ex) {
                    console.log('parsing failed', ex);
                    vm.contactlist = [];
                    vm.isProcessing = false;
                })
        }, 300)
    }
});
</script>
```

## 3.4 v-cloak 디렉티브

```angular2html
// 예제 03-10
<style>
    #list {width:600px;border:1px solid black;border-collapse:collapse;}
    #list td,#list th{border:1px solid black;text-align:center;}
    #list>thead>tr{color:yellow;background-color:purple;}
    [v-cloak]{display:none;}
</style>

<div id="example" v-cloak>
......
</div>
```

## 3.5 Vue 인스턴스 라이프 사이클

| 라이프 사이클 훅 | 설명 |
| ------------- | ------- |
| beforeCreate | Vue 인스턴스가 실행되고 데이터에 대한 관찰 기능 및 이벤트 감시자 설정 전에 호출됩니다. |
| created | Vue 인스턴스가 생성된 후에 데이터에 대한 관찰 기능 계산형 속성 메서드 감시자 설정이 완료된 후에 호출됩니다. |
| beforeMount | 마운트가 시작되기 전에 호출됩니다. |
| mounted | el에 vue 인스턴스의 데이터가 마운트된 후에 호출됩니다. |
| beforeUpdate | 가상 DOM이 렌더링 패치되기 전에 데이터가 변경될 때 호출됩니다 이 훅에서 추가적인 상태 변경을 수행할 수 있습니다 하지만 추가로 다시 렌더링하지는 않습니다. |
| updated | 데이터의 변경으로 가상 DOM이 다시 렌더링되고 패치된 후에 호출됩니다. 이 훅이 호출되었을 때는 이미 컴포넌트의 DOM이 업데이트된 상태입니다 그래서 DOM에 종속성이 있는 연산을 이 단계에서 수행할 수 있습니다. |
| beforeDestroy | Vue 인스턴스가 제거되기 전에 호출됩니다. |
| destroyed | Vue 인스턴스가 제거된 후에 호출됩니다. 이 훅이 호출될 때는 Vue 인스턴스의 모든 디렉티브의 바인딩이 해제되고 이벤트 연결도 모두 제거됩니다. |

[Vue 컴포넌트 라이프 사이클 바로가기](https://kr.vuejs.org/v2/guide/instance.html#%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8)

```angular2html
// 예제 03-11: 라이프 사이클 훅 추가
<script type="text/javascript">
var vmSum = new Vue({
    el: "#example",
    data: {num: 0},
    created: function() {
        console.log("Created!!");
    },
    updated: function() {
        console.log("updated!!");
        console.log(this.num);
    },
    computed: {
        sum: function() {
            var n = Number(this.num);
            if (Number.isNaN(n) || n < 1) return 0;
            return ((1+n) * n) / 2;
        }
    }
});
</script>
```


