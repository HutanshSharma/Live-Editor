import { Fragment, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import EditorsGroup from './EditorsGroup';
import { generateCode, defaultcode, defaultdata} from '../generateCode';
import Preview from './Preview';
import Header from './Header';
import Modal from './Modal';
import { useDevToolsDetection } from '../hooks/useDevToolsDetection';
import { useImages } from '../store/ImageContext';

export default function CodeEditor() {
  const {images} = useImages()
  const htmlRef = useRef();
  const cssRef = useRef();
  const jsRef = useRef();
  const modal = useRef();
  const cheatingModal = useRef();
  const inspectModal = useRef();
  const reloadModal = useRef();
  const preventpaste = useRef()
  const imagesmodal = useRef()
  const submitmodal = useRef()
  const successmodal = useRef()

  const initialCode = useMemo(()=>{
    const stored = JSON.parse(sessionStorage.getItem('code'));
    const initialCode = stored
    ? { prevcode: generateCode(addimages(stored.html), stored.css, stored.js), data: stored }
    : { prevcode: defaultcode, data: defaultdata };
    return initialCode
  },[])
  
  const [code, setCode] = useState(initialCode);
  const [ mobileView, setMobileView ] = useState('code');
  const [ isFull, setisFull ] = useState(!!(document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement))
  const areDevToolsOpen = useDevToolsDetection()


  // fullscreen checker
  const enterFullscreen = useCallback(function enterFullscreen(){
    const element=document.documentElement;
    if (element.requestFullscreen){
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen){
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen){
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen){
      element.msRequestFullscreen();
    }
  },[]);

  useEffect(() => {
  const handleFullscreenChange = () => {
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    setisFull(!!isFullscreen);
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.addEventListener("mozfullscreenchange", handleFullscreenChange);
  document.addEventListener("MSFullscreenChange", handleFullscreenChange);

  return () => {
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
  document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
  };
  }, []);

  useEffect(()=>{
    if(isFull === false){
      modal.current.showModal()
      if(cheatingModal.current.open) cheatingModal.current.close()
      if(inspectModal.current.open) inspectModal.current.close()
      if(submitmodal.current.open) submitmodal.current.close()
      if(imagesmodal.current.open) imagesmodal.current.close()
      setisFull(true)
    }
  },[isFull])

  useEffect(()=>{
    if(areDevToolsOpen===true){
      reloadModal.current.showModal()
      if(cheatingModal.current.open) cheatingModal.current.close()
      if(inspectModal.current.open) inspectModal.current.close()
      if(submitmodal.current.open) submitmodal.current.close()
      if(imagesmodal.current.open) imagesmodal.current.close()
    }
  },[areDevToolsOpen])


  // code handles and generated here
  function handleCodeChange(){
    const data={
      html:htmlRef.current.getValue(),
      css:cssRef.current.getValue(),
      js:jsRef.current.getValue()
    }
    const generatedcode = generateCode(addimages(data.html),data.css,data.js)
    const prevcodelen = code.data.html.length+code.data.css.length+code.data.js.length
    const newcodelen = data.html.length+data.css.length+data.js.length
    if(newcodelen-prevcodelen>60){
      preventpaste.current.showModal()
    }
    else{
      setCode({prevcode:generatedcode,data:data})
    }
  }

  useEffect(() => {
    sessionStorage.setItem('code', JSON.stringify(code.data));
  }, [code.data]);

  function addimages(html){
    let output=html;
    for (const [name, url] of Object.entries(images)) {
      const regex = new RegExp(`src\s*=\s*["']${name}["']`, "g");
      output = output.replace(regex, `src="${url}"`);
    }
    return output;
};

  // Keys banned here
  useEffect(() => {
    const handler=(event)=>{
      if ((event.ctrlKey||event.metaKey) &&
       (event.key.toLowerCase() === 'c' ||
        event.key.toLowerCase() === 'v' ||
        event.key.toLowerCase() === 'x')) {
        event.preventDefault();
        cheatingModal.current.showModal()
        if(inspectModal.current.open) inspectModal.current.close()
        if(submitmodal.current.open) submitmodal.current.close()
        if(imagesmodal.current.open) imagesmodal.current.close()
      }
      if((event.key === 'F12') || ((event.ctrlKey || event.metaKey) && (event.shiftKey) || event.altKey)) {
        event.preventDefault();
        inspectModal.current.showModal()
        if(cheatingModal.current.open) cheatingModal.current.close()
        if(submitmodal.current.open) submitmodal.current.close()
        if(imagesmodal.current.open) imagesmodal.current.close()
      }
      if ((event.ctrlKey || event.metaKey) &&
       (event.key.toLowerCase() === 'i' ||
        event.key.toLowerCase() === 'j'
      )){
        event.preventDefault();
        inspectModal.current.showModal()
        if(cheatingModal.current.open) cheatingModal.current.close()
        if(submitmodal.current.open) submitmodal.current.close()
        if(imagesmodal.current.open) imagesmodal.current.close()
      }
      };

      window.addEventListener('keydown', handler);
      return () => {
        window.removeEventListener('keydown', handler);
      };
  }, []);

  useEffect(()=>{
    const handler=(e)=>{
      e.preventDefault();
      cheatingModal.current.showModal()
      if(inspectModal.current.open) cheatingModal.current.close()
      if(submitmodal.current.open) submitmodal.current.close()
      if(imagesmodal.current.open) imagesmodal.current.close()
    }
    window.addEventListener('contextmenu', handler);
    return () => {
      window.removeEventListener('contextmenu', handler);
    };
  },[])

  return (
    <Fragment>
      <Modal heading={'Permission'} description={'You have to enter fullscreen to continue'} btntext={'Allow'} ref={modal} func={enterFullscreen} />
      <Modal heading={'Permission'} description={'Close the Developer Tools and Reload'} btntext={'Reload'} ref={reloadModal} func={()=>{location.reload()}} />
      <Modal heading={'Warning'} description={"You can't copy, paste, or use context menu"} btntext={'Confirm'} ref={cheatingModal}/>
      <Modal heading={'Warning'} description={"You can't use developer Tools or inspect elements"} btntext={'Confirm'} ref={inspectModal}/>
      <Modal heading={'Warning'} description={"It seems like you tried pasting large chunk of code. Remove the pasted part or you can't code here"} btntext={'Confirm'} ref={preventpaste}/>
      <div className="flex flex-col h-screen">
        <Header code={code.data} modal={imagesmodal} submitmodal={submitmodal} successmodal={successmodal}/>
        <div className='flex-1 min-h-0 relative overflow-hidden lg:overflow-visible lg:flex lg:flex-row lg:gap-8 lg:px-10 lg:py-4'>
          <div className={`stack-card p-3 lg:p-0 lg:relative lg:w-1/2 lg:h-full ${mobileView === 'code' ? 'is-front' : 'is-back'}`}>
            <EditorsGroup handleCodeChange={handleCodeChange} htmlRef={htmlRef} cssRef={cssRef} jsRef={jsRef} currentdata={initialCode.data} modal={cheatingModal}/>
          </div>
          <div className={`stack-card p-3 lg:p-0 lg:relative lg:w-1/2 lg:h-full ${mobileView === 'preview' ? 'is-front' : 'is-back'}`}>
            <Preview modal={cheatingModal} code={code.prevcode} />
          </div>
          <button
            aria-label={mobileView === 'code' ? 'Show preview' : 'Show code'}
            onClick={() => setMobileView(v => (v === 'code' ? 'preview' : 'code'))}
            className="fixed bottom-5 right-5 z-40 lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white shadow-lg shadow-black/40 transition-all duration-200">
            {mobileView === 'code'
              ? <i className="fa-solid fa-eye text-lg"></i>
              : <i className="fa-solid fa-code text-lg"></i>}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
