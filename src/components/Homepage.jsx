import { FileText, ExternalLink, Info, AlertCircle, Monitor } from 'lucide-react';
import Modal from "./Modal"
import { Link } from 'react-router-dom';
import { useRef,useEffect } from 'react';

export default function Homepage() {
  const inspectModal = useRef();
  const cheatingModal = useRef();

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
    <Modal heading={'Warning'} description={"You can't copy, paste, or use contextmenu"} btntext={'Confirm'} ref={cheatingModal}/>
    <Modal heading={'Warning'} description={"You can't use Developer Tools or inspect elements"} btntext={'Confirm'} ref={inspectModal}/>
    <div className="min-h-screen text-white" style={{background: 'linear-gradient(180deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)'}}>
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="bitcount-prop-single text-white text-4xl font-bold ">
                <i className="fa-solid fa-not-equal text-2xl mr-6"></i>NoCheating</h1>
          </div>
          <a 
            href="https://developer.mozilla.org/en-US/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-cyan-200 hover:text-cyan-200 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>MDN Docs</span>
          </a>
        </div>
      </header>
      <main className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r bungee-regular bg-white bg-clip-text text-transparent">
            Welcome Developers
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience interactive web design 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to='/codeeditor'
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg inline-block text-center"
            >
              Explore Now
            </Link>
          </div>
        </div>
        <div className="max-w-4xl mx-auto space-y-12 mb-16">
          <div className="bg-[#28282d] bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-[#28282d] border-opacity-20">
            <div className="flex items-start space-x-4">
              <FileText className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Automatic Code Structure</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  This editor doesn't require you to write boilerplate HTML structure. When you write your HTML, CSS, and JavaScript, 
                  the system automatically wraps your code in a complete HTML document with proper DOCTYPE declaration, meta tags for 
                  character encoding and viewport settings, and includes your styles and scripts in the appropriate sections.
                </p>
                <div className="bg-[rgba(0,0,0,0.4)] bg-opacity-40 rounded-lg p-4 font-mono text-sm">
                  <div className="text-gray-400 mb-2">// Behind the scenes, your code becomes:</div>
                  <div className="text-cyan-300">generateCode(html, css, js)</div>
                  <div className="text-gray-400">↓</div>
                  <div className="text-blue-300">Complete HTML document with head, body, styles, and scripts</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#28282d] bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-[#28282d] border-opacity-20">
            <div className="flex items-start space-x-4">
              <Monitor className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Editor Interface</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  The coding interface consists of three separate code editors - one for HTML, one for CSS, and one for JavaScript. 
                  Each editor can be expanded individually to give you more space to work on that particular language. This allows 
                  you to focus on one aspect of your code at a time while still having access to all three languages.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  The preview area shows your code in real-time as you type, so you can immediately see how your changes affect 
                  the final output. The interface is designed to work best in full-screen mode to maximize your workspace.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#28282d] bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-[#28282d] border-opacity-20 border-l-4 border-l-orange-400">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-orange-300">Important Usage Information</h3>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
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
          <div className="bg-[#28282d] bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-[#28282d] border-opacity-20">
            <div className="flex items-start space-x-4">
              <Info className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Documentation and Learning</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  While working in the editor, you have access to MDN Web Docs through the link in the top navigation. 
                  MDN (Mozilla Developer Network) is one of the most comprehensive and reliable resources for web development 
                  documentation, covering HTML, CSS, JavaScript, and web APIs.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Since you can't open developer tools within the editor, MDN docs serve as your primary reference for 
                  syntax, properties, methods, and examples while coding.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#28282d] bg-opacity-5 backdrop-blur-lg rounded-2xl p-8 border border-[#28282d] border-opacity-10">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-300">How Your Code Is Processed</h3>
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
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Ready to Start?</h3>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Now that you understand how the editor works and its limitations, you can begin creating your web page
          </p>
        </div>
      </main>
      <footer className="border-t border-white border-opacity-20 mt-16 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2025 NoCheating. Interactive web page development environment.</p>
        </div>
      </footer>
    </div>
    </>
  );
}