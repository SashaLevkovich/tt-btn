const form = document.forms[ 'form' ];
const inputBlock = document.querySelector( '.input' );
const btnBlock = document.querySelector( '.btn' );
const input = document.querySelector( '.input > input' );
const btn = document.querySelector( '.btn button' );
const modal = document.querySelector( '.modal__container' );

const url = 'https://httpbin.org/post';

const valid = data => {
    if ( !data ) {
        inputBlock.style.border = '2px solid red';
        btnBlock.style.border = '2px solid red';
        return;
    } else {
        inputBlock.style.border = '2px solid green';
    }
};

const fetchReq = async userData => {
    const response = await fetch( url, {
        method: 'POST',
        body: userData,
    } );

    if ( !response.ok ) {
        throw new Error( `Ошибка по адресу ${ url }, статус ошибки ${ response.status }` );
    }


    return await response.json();
};


input.addEventListener( 'blur', () => valid( input.value ) );

form.addEventListener( 'submit', async ( e ) => {
    e.preventDefault();
    if ( !input.value ) {
        inputBlock.style.border = '2px solid red';
        btnBlock.style.border = '2px solid red';
        return;
    }
    fetchReq( input.value )
        .then( res => {
            console.log( res.data );
            modal.classList.add( 'open' );
            setTimeout( () => {
                modal.classList.remove( 'open' );
            }, 5000 );
            form.reset();

        } )
        .catch( ( err ) => console.error( err ) );
} );


