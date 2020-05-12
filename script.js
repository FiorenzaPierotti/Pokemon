function index() {
    if (window.location.href.indexOf('index.html') != -1) {
        fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=806').then(result => {
            console.dir(result)
            if(result.ok){
            if( result.headers.get('Content-Type').includes('application/json')){
                return result.json()
                init(json)
            } 
            throw new Error('response type is not json');
        
            } else {
                throw new Error('response failed');
            }
        }).then( json =>{
            console.log(json);
            init(json);
            
            
        }).catch(err => {
            console.log(err);
        });
        
        function init(obj) {
            const create = (pokemon) =>{
                const name = pokemon.name;
                const image = pokemon.url.slice(33, -1);
        
                console.log(name, image)
                const divcol = document.createElement('div');
                divcol.classList.add('col', 'mb-3');
        
                const a = document.createElement('a');
                a.classList.add('card', 'h-100');
                divcol.appendChild(a);
        
                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + image + '.png');
                image.alt = name;
                a.appendChild(img);
        
        
                a.addEventListener('click', function(){
                    scrollP(name);
                });
        
                const divtitle = document.createElement('div');
                divtitle.classList.add('card-body', 'p-2');
                a.appendChild(divtitle);
        
                const h6 = document.createElement('h6');
                h6.classList.add('card-title', 'text-capitalize', 'text-center');
                divtitle.appendChild(h6);
        
                const text = document.createTextNode(name);
                h6.appendChild(text);        
        
                return divcol;
            };
            
            obj.results.map(pokemon => create(pokemon)).forEach(divcol => document.querySelector('.row').appendChild(divcol));
            document.querySelector('.wrapper').style.display = 'flex'; // mostra la card quando la pagina è caricata
            document.querySelector('.loader').style.display = 'none'; //nasconde il loader quando la pagina è caricata 
            document.querySelector('html').scrollTop = localStorage.getItem('scrollPosition');  
        
        };
        
        function scrollP(name){ 
            var scrollPosition = document.querySelector('html').scrollTop;
            localStorage.setItem('scrollPosition', scrollPosition);
            window.location.href = 'pokemon.html?pokemon='+name;    
        };
    }
}
index();

function pokemon() {
    if (window.location.href.indexOf('pokemon.html') != -1) {
        function getpk () {

            const urlParams = new URLSearchParams(window.location.search);
            const pokemon = urlParams.get('pokemon');
        
            fetch('https://pokeapi.co/api/v2/pokemon/'+pokemon).then(result => {
            console.dir(result)
            
            if(result.ok){
                if( result.headers.get('Content-Type').includes('application/json')){
                return result.json()
                init(json)
                } 
                throw new Error('response type is not json');
        
            } else {
                throw new Error('response failed');
            }
            }).then( json =>{
            console.log(json);
            init(json);
            }).catch(err => {
            console.log(err);
            })    
        }
        getpk();
        
        function init(ciao) {   
        
            const create = (poke) =>{
        
                const name = poke.name;
                const experience = poke.base_experience;
                const height = poke.height;
                const id = poke.id;
                const def = poke.is_default;
                const order = poke.order;
                const weight = poke.weight;
                const image = poke.sprites.front_default;         
        
                /*const values = [
                    {experience:experience}, 
                    {height:height},
                    {id:id},
                    {default:def},
                    {order:order},
                    {weight:weight}
                ];*/
        
                /*const keys = Object.keys(values[i]);
                li.innerHTML = keys[0]+': '+values[i][keys[0]];*/
        
                const val2 = [
                    {label:'Experience', value: experience},
                    {label:'Height', value: height},
                    {label:'Id', value: id},
                    {label:'Default', value: def},
                    {label:'Order', value: order},
                    {label:'Weight', value: weight},
                ]
        
                console.log(name, experience, height, id, def, order, weight, image);
                
                const text = document.createTextNode(name);
        
                const div = document.querySelector('.pokemon');        
                div.appendChild(text);
        
                const divcard = document.querySelector('.card');        
        
                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = (image);
                image.alt = name;
                divcard.appendChild(img);
        
                divbadge = document.createElement('div');
                divbadge.classList.add('badge-wrapper');
        
                for (i= 0; i<poke.types.length; i++) { 
                    const type = poke.types[i].type.name        
                    span = document.createElement('div');
                    span.classList.add('badge', 'badge-'+type);            
                    span.innerHTML = type;
                    divbadge.appendChild(span);
                    divcard.appendChild(divbadge);
                    const types = poke.types[i].type.name;
                    console.log(types);
                }
        
                const ul = document.createElement('ul');
                ul.classList.add('list-group', 'm-3');
                divcard.appendChild(ul);
        
                const li = document.createElement('li');
                li.classList.add('list-group-item');             
                li.innerHTML = 'Abilities: '+'<br>';
                ul.appendChild(li);        
                for (i= 0; i<poke.abilities.length; i++) { 
                    const span = document.createElement('span');              
                    const numAbility = poke.abilities[i].ability.url.slice(34, -1);             
                    ability = poke.abilities[i].ability.name;
                    span.classList.add('ability', 'ability-'+numAbility);
                    span.innerHTML = ability.replace("-", " ");            
                    li.appendChild(span);
                }
        
                for (i= 0; i<val2.length; i++) {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item'); 
                    li.innerHTML = val2[i].label+': '+val2[i].value;
                    ul.appendChild(li);
                }          
            };
            document.querySelector('.card').style.display = 'flex'; // mostra la card quando la pagina è caricata
            document.querySelector('.loader').style.display = 'none'; //nasconde il loader quando la pagina è caricata
            create(ciao);       
        };        
    }
}
pokemon();
        
function myFunction(){
    const div = document.createElement('div');
    div.classList.add('loader');
    document.querySelector('body').appendChild(div);     
}
        
function goBack(){
    window.history.back();
}
