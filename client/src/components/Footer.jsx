import { Footer as FooterFlow } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const Footer = () => {
  return (
    <FooterFlow container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Sahand's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterFlow.Title title="About" />
              <FooterFlow.LinkGroup col>
                <FooterFlow.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </FooterFlow.Link>
                <FooterFlow.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sahand's Blog
                </FooterFlow.Link>
              </FooterFlow.LinkGroup>
            </div>
            <div>
              <FooterFlow.Title title="Follow us" />
              <FooterFlow.LinkGroup col>
                <FooterFlow.Link
                  href="https://www.github.com/sahandghavidel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </FooterFlow.Link>
                <FooterFlow.Link href="#">Discord</FooterFlow.Link>
              </FooterFlow.LinkGroup>
            </div>
            <div>
              <FooterFlow.Title title="Legal" />
              <FooterFlow.LinkGroup col>
                <FooterFlow.Link href="#">Privacy Policy</FooterFlow.Link>
                <FooterFlow.Link href="#">
                  Terms &amp; Conditions
                </FooterFlow.Link>
              </FooterFlow.LinkGroup>
            </div>
          </div>
        </div>
        <FooterFlow.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterFlow.Copyright
            href="#"
            by="Sahand's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterFlow.Icon href="#" icon={BsFacebook} />
            <FooterFlow.Icon href="#" icon={BsInstagram} />
            <FooterFlow.Icon href="#" icon={BsTwitter} />
            <FooterFlow.Icon
              href="https://github.com/sahandghavidel"
              icon={BsGithub}
            />
            <FooterFlow.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FooterFlow>
  );
};

export default Footer;
