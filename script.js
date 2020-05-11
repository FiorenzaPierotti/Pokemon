fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=606').then(result => {
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

function myFunction(){
    const div = document.createElement('div');
    div.classList.add('loader');
    document.querySelector('body').appendChild(div);     
}