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

  const initialCode = useMemo(()=>{
    const stored = JSON.parse(sessionStorage.getItem('code'));
    const initialCode = stored
    ? { prevcode: generateCode(addimages(stored.html), stored.css, stored.js), data: stored }
    : { prevcode: defaultcode, data: defaultdata };
    return initialCode
  },[])
  
  const [code, setCode] = useState(initialCode);
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
      setisFull(true)
    }
  },[isFull])

  useEffect(()=>{
    if(areDevToolsOpen===true){
      reloadModal.current.showModal()
      if(cheatingModal.current.open) cheatingModal.current.close()
      if(inspectModal.current.open) inspectModal.current.close()
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
      }
      else if((event.key === 'F12') || ((event.ctrlKey || event.metaKey) && (event.shiftKey) || event.altKey)) {
        event.preventDefault();
        inspectModal.current.showModal()
        if(cheatingModal.current.open) cheatingModal.current.close()
      }
      if ((event.ctrlKey || event.metaKey) &&
       (event.key.toLowerCase() === 'i' ||
        event.key.toLowerCase() === 'j'
      )){
        event.preventDefault();
        inspectModal.current.showModal()
        if(cheatingModal.current.open) cheatingModal.current.close()
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
      if(modal.current.open) modal.current.close()
    }
    window.addEventListener('contextmenu', handler);
    return () => {
      window.removeEventListener('contextmenu', handler);
    };
  },[])

  return (
    <Fragment>
      <Header code={code.prevcode} />
      <Modal heading={'Permission'} description={'You have to enter fullscreen to continue'} btntext={'Allow'} ref={modal} func={enterFullscreen} />
      <Modal heading={'Permission'} description={'Close the Developer Tools and Reload'} btntext={'Reload'} ref={reloadModal} func={()=>{location.reload()}} />
      <Modal heading={'Warning'} description={"You can't copy, paste, or use context menu"} btntext={'Confirm'} ref={cheatingModal}/>
      <Modal heading={'Warning'} description={"You can't use developer Tools or inspect elements"} btntext={'Confirm'} ref={inspectModal}/>
      <Modal heading={'Warning'} description={"It seems like you tried pasting large chunk of code. Remove the pasted part or you can't code here"} btntext={'Confirm'} ref={preventpaste}/>
      <div className='flex w-screen h-11/12 gap-20' >
        <div className="py-5 w-5/12 h-full px-10 relative">
          <EditorsGroup handleCodeChange={handleCodeChange} htmlRef={htmlRef} cssRef={cssRef} jsRef={jsRef} currentdata={initialCode.data} modal={cheatingModal}/>
        </div>
        <div className='w-1/2 py-5'>
          <Preview modal={cheatingModal} code={code.prevcode} />
        </div>
      </div>
    </Fragment>
  );
}
