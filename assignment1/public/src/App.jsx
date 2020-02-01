const name = 'SASHA WANG';

const element = (
  <div title='Outer div'>
    <div className='container'>
      <div className='wave'></div>
      <img id='selfie' src='img/headshot.png' />
      <h2>{name}</h2>
      <p>
        Hello there, I am Sasha and a senior student in San Diego State
        Univeristy. Currently I am pursuing my bachelor degree of art, emphise
        in Graphic Design; a minor in Computer Science. Meanwhile, I also work
        as a student assistant at LARC in SDSU, where I am responsible for
        front-end design as well as the organization of language materials.
        During the last 3 years in the U.S., I had learned a variety of skills
        in my major and minor fields, such as Typography Design, Graphic Design,
        Branding, Photography and art history; softwares including Illustrator,
        InDesign, Photoshop, Sketch, XD, After Effect, , computer programming
        (Java), Web Design (HTML, CSS and Javascript).
      </p>
      <a href='https://github.com/Sasha-1216'>
        <button type='button'>View my Github</button>
      </a>
    </div>
  </div>
);

ReactDOM.render(element, document.getElementById('contents'));
