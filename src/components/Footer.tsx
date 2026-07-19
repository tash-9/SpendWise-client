import { Link } from "react-router-dom";
import { TrendingDown, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-display font-bold text-xl text-white mb-3">
              <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
                <TrendingDown size={16} className="text-white" />
              </div>
              SpendWise AI
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Budget smarter. Spend better. Let AI coach your financial decisions.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Github size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="mailto:hello@spendwise.ai" className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/dashboard/ai-coach" className="hover:text-white transition-colors">AI Coach</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SpendWise AI. All rights reserved.</p>
          <p>Made with 💜 for smarter spending</p>
        </div>
      </div>
    </footer>
  );
}
