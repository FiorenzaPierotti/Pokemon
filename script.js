fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=606').then(result => {
    console.dir(result)
    if(result.ok){
      if( result.headers.get('Content-Type').includes('application/json')){
        return result.json()
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
            onClick(name);
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
    document.querySelector('.card-poke').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'flex'; // mostra la card quando la pagina è caricata
    document.querySelector('.loader').style.display = 'none'; //nasconde il loader quando la pagina è caricata 
    document.querySelector('html').scrollTop = localStorage.getItem('scrollPosition');  
   
};

function onClick(name){ 
    var scrollPosition = document.querySelector('html').scrollTop;
    localStorage.setItem('scrollPosition', scrollPosition);
    
    fetch('https://pokeapi.co/api/v2/pokemon/'+name).then(result => {
    console.dir(result)
    
    if(result.ok){
        if( result.headers.get('Content-Type').includes('application/json')){
        return result.json()
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

            const val2 = [
                {label:'Experience', value: experience},
                {label:'Eeight', value: height},
                {label:'Id', value: id},
                {label:'Default', value: def},
                {label:'Order', value: order},
                {label:'Weight', value: weight},
            ]
            
            const text = document.createTextNode(name);

            const div = document.querySelector('.pokemon');        
            div.appendChild(text);

            const divcard = document.querySelector('.card-poke');        

            const img = document.createElement('img');
            img.classList.add('card-img-top');
            img.src = (image);
            image.alt = name;
            divcard.appendChild(img);

            divbadge = document.createElement('div');
            divbadge.classList.add('badge-wrapper');

            for (i= 0; i<poke.types.length; i++) { 
                type = poke.types[i].type.name           
                span = document.createElement('span');
                span.classList.add('badge', 'badge-'+type);            
                span.innerHTML = type;
                divbadge.appendChild(span);
                divcard.appendChild(divbadge);
                const types = poke.types[i].type.name;
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

        document.querySelector('.wrapper').style.display = 'none';
        document.querySelector('.card-poke').style.display = 'flex'; // mostra la card quando la pagina è caricata
        document.querySelector('.loader').style.display = 'none'; //nasconde il loader quando la pagina è caricata
        window.scrollTo(0,0);
        create(ciao);       
    };    
};

function myFunction(){
    const div = document.createElement('div');
    div.classList.add('loader');
    document.querySelector('body').appendChild(div);     
}

function goBack(){
    location.reload();
}