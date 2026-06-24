import { FileText, ExternalLink, Info, AlertCircle, Monitor } from 'lucide-react';
import Modal from "./Modal"
import { Link } from 'react-router-dom';
import { useRef,useEffect,useState } from 'react';
import UploadModal from "./UploadModal"
import SuccessModal from './SuccessModal';

export default function Homepage() {
  const [isopen, setisopen] = useState(false)
  const inspectModal = useRef();
  const cheatingModal = useRef();
  const modal = useRef()
  const successmodal = useRef()
  const failuremodal = useRef()
  const maximageref = useRef()
  const revealRef = useRef(null)

  useEffect(() => {
    const root = revealRef.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const handler=(event)=>{
      if((event.key === 'F12') || ((event.ctrlKey || event.metaKey) && (event.shiftKey) || event.altKey)) {
        event.preventDefault();
        inspectModal.current.showModal()
      }
      else if ((event.ctrlKey || event.metaKey) &&
       (event.key.toLowerCase() === 'i' ||
        event.key.toLowerCase() === 'j' ||
        event.key.toLowerCase() === 'c'
      )){
        event.preventDefault();
        inspectModal.current.showModal()
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
      }
      window.addEventListener('contextmenu', handler);
      return () => {
        window.removeEventListener('contextmenu', handler);
      };
  },[])

  return (
    <>
    <Modal heading={'Warning'} description={"You can't copy, paste, or use context menu"} btntext={'Confirm'} ref={cheatingModal}/>
    <Modal heading={'Warning'} description={"You can't use Developer Tools or inspect elements"} btntext={'Confirm'} ref={inspectModal}/>
    <UploadModal modalref={modal} successref={successmodal} failureref={failuremodal} maximageref={maximageref} setisopen={setisopen} />
    <SuccessModal ref={successmodal} heading={'Image uploaded'} description={'Image has been uploaded successfully'} isopen={isopen} setisopen={setisopen} bgcolor={'success'}/>
    <SuccessModal ref={failuremodal} heading={'Failed'} description={'Image name already taken'} isopen={isopen} setisopen={setisopen} bgcolor={'failure'}/>
    <SuccessModal ref={maximageref} heading={'Error'} description={'Your storage is full remove some pictures to add more'} isopen={isopen} setisopen={setisopen} bgcolor={'failure'}/>


    <div className="min-h-screen text-white" style={{background: 'linear-gradient(160deg, #0a0f1c 0%, #131b2e 55%, #0f1729 100%)'}}>
      <header className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="bitcount-prop-single text-white text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center">
                <i className="fa-solid fa-not-equal text-xl sm:text-2xl mr-3 sm:mr-5"></i>NoCheating</h1>
          </div>
          <a
            href="https://developer.mozilla.org/en-US/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sky-300 hover:text-sky-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">MDN Docs</span>
          </a>
        </div>
      </header>
      <main ref={revealRef} className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 fade-up">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 bungee-regular bg-gradient-to-r from-white via-sky-100 to-indigo-200 bg-clip-text text-transparent">
            Welcome Developers
          </h2>
          <p className="text-base sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto px-2">
            Experience interactive web design
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <button
            className="group bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl shadow-lg shadow-black/30 inline-flex items-center justify-center gap-2"
            onClick={()=>modal.current.showModal()}>
              <i className="fa-solid fa-images transition-transform duration-300 group-hover:scale-110"></i>Add Images</button>
            <Link
              to='/codeeditor'
              className="group bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl shadow-lg shadow-black/30 inline-flex items-center justify-center gap-2"
            >
              Explore Now<i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 mb-12 sm:mb-16">
          <div className="reveal feature-card group bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <FileText className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-300">Automatic Code Structure</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                  This editor doesn't require you to write boilerplate HTML structure. When you write your HTML, CSS, and JavaScript, 
                  the system automatically wraps your code in a complete HTML document with proper DOCTYPE declaration, meta tags for 
                  character encoding and viewport settings, and includes your styles and scripts in the appropriate sections.
                </p>
                <div className="bg-black/40 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-gray-400 mb-2">// Behind the scenes, your code becomes:</div>
                  <div className="text-cyan-300">generateCode(html, css, js)</div>
                  <div className="text-gray-400">↓</div>
                  <div className="text-blue-300">Complete HTML document with head, body, styles, and scripts</div>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal feature-card group bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Monitor className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-300">Editor Interface</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                  The coding interface consists of three separate code editors - one for HTML, one for CSS, and one for JavaScript. 
                  Each editor can be expanded individually to give you more space to work on that particular language. This allows 
                  you to focus on one aspect of your code at a time while still having access to all three languages.
                </p>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  The preview area shows your code in real-time as you type, so you can immediately see how your changes affect 
                  the final output. The interface is designed to work best in full-screen mode to maximize your workspace.
                </p>
              </div>
            </div>
          </div>
          <div className="reveal feature-card group bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 border-l-4 border-l-orange-400">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <AlertCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-orange-300">Important Usage Information</h3>
                <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
                  <p>
                    <strong className="text-orange-300">Copy and Paste:</strong> The copy and paste functionality is disabled 
                    within the editor environment. You'll need to type your code directly into the editors.
                  </p>
                  <p>
                    <strong className="text-orange-300">Developer Tools:</strong> Browser developer tools are not accessible 
                    while using this editor. This is an intentional restriction of the environment.
                  </p>
                  <p>
                    <strong className="text-orange-300">Full Screen Mode:</strong> The editor is designed to operate in 
                    full-screen mode. For the best experience and proper functionality, always use the editor in full-screen view.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal feature-card group bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <Info className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-125" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-300">Documentation and Learning</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                  While working in the editor, you have access to MDN Web Docs through the link in the top navigation. 
                  MDN (Mozilla Developer Network) is one of the most comprehensive and reliable resources for web development 
                  documentation, covering HTML, CSS, JavaScript, and web APIs.
                </p>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Since you can't open developer tools within the editor, MDN docs serve as your primary reference for 
                  syntax, properties, methods, and examples while coding.
                </p>
              </div>
            </div>
          </div>
          <div className="reveal feature-card bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-blue-300">How Your Code Is Processed</h3>
            <div className="bg-[rgba(0,0,0,0.4)] bg-opacity-50 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <div className="space-y-2">
                <div className="text-gray-400">// When you write code in the three editors:</div>
                <div className="text-orange-300">HTML Editor: &lt;div&gt;Hello World&lt;/div&gt;</div>
                <div className="text-blue-300">CSS Editor: div {'{ color: blue; }'}</div>
                <div className="text-cyan-300">JS Editor: console.log('Hello');</div>
                <div className="text-gray-400 mt-4">// It gets transformed into:</div>
                <div className="text-cyan-300 mt-2">
                  <div>&lt;!DOCTYPE html&gt;</div>
                  <div>&lt;html lang="en"&gt;</div>
                  <div>&nbsp;&nbsp;&lt;head&gt;</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta charset="UTF-8"&gt;</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;style&gt;div {'{ color: blue; }'}&lt;/style&gt;</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;script&gt;...your JS code...&lt;/script&gt;</div>
                  <div>&nbsp;&nbsp;&lt;/head&gt;</div>
                  <div>&nbsp;&nbsp;&lt;body&gt;</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;Hello World&lt;/div&gt;</div>
                  <div>&nbsp;&nbsp;&lt;/body&gt;</div>
                  <div>&lt;/html&gt;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reveal text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start?</h3>
          <p className="text-gray-300 mb-8 text-base sm:text-lg max-w-2xl mx-auto">
            Now that you understand how the editor works and its limitations, you can begin creating your web page
          </p>
          <Link
            to='/codeeditor'
            className="group bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl shadow-lg shadow-black/30 inline-flex items-center justify-center gap-2"
          >
            Start Coding<i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>
      </main>
      <footer className="border-t border-white/10 mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-slate-400">
          <p>&copy; 2025 NoCheating. Interactive web page development environment.</p>
        </div>
      </footer>
    </div>
    </>
  );
}