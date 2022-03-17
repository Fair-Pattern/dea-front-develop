export const Footer = () => (<>
  <div className="bg-blue-darkest w-full h-auto text-white grid text-center grid-cols-3 p-16 bottom-0 ">
    <div className="h-full">
      <p className="text-2xl">About</p>
      <br />
      <div className="w-full flex justify-center">
        <a href="https://erasmus-plus.ec.europa.eu/" rel="noreferrer" target={'_blank'}>
          <img src="/images/Erasmus_Logo.jpg" width="200" className="flex justify-center rounded-md" />
        </a>
      </div>
    </div>
    <div>
      <p className="text-2xl">Contact</p>
      <br />
      <div className="w-full text-left">
        <p>
          <span className="text-l">Email</span>: <a
         onClick={() => window.location.href = 'mailto:dea@penworldwide.org'}
          className="underline cursor-pointer">dea@penworldwide.org</a>
        </p>
        <p>
          Project Website: <a className="underline" rel="noreferrer" href="http://questionnaire.ideaforstartup.eu/" target="_blank">questionnaire.ideaforstartup.eu</a>
        </p>
        <p>
          Feel free to contact us with any feedback, suggestions and ideas!
        </p>
      </div>

    </div>

    <div>
      <p className="text-2xl">Financed By</p>
      <br />
      <div className="w-full flex flex-col items-center">
        <a href={'https://www.penworldwide.org/'} rel="noreferrer" target={'_blank'}>
          <img src="/images/pen-logo-2.png" width="200" className="bg-white p-4 rounded-md" />
        </a>
        <a href={'https://amorbg.com/en/'} rel="noreferrer" className="mt-2" target={'_blank'}>
          <img src="/images/AISD-Logo.jpg" width="200" className="bg-amor p-2 rounded-md" />
        </a>
        <a href={'https://liba.lt/'} rel="noreferrer" className="mt-2" target={'_blank'}>
          <img src="/images/LIBA_Logo.jpg" width="200" className="bg-white p-4 rounded-md" />
        </a>
      </div>

    </div>
  </div>
  <div className="bg-blue-darkest w-full h-auto text-white grid text-center p-4 bottom-0">
    <p>
      This website is part of the Project <span className="font-bold">{"Digital Entrepreneur Academy"}</span><br></br>
      <span className="font-bold">2020-2-BG01-KA205-079483</span>
    </p>
    <p>© 2022 - DigitalEntrepreneurAcademy – <a className="underline font-bold" 
     href="http://questionnaire.ideaforstartup.eu/en/Privacy">Privacy</a></p>
  </div>
</>

);
