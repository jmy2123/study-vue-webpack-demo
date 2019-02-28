<template>
	<div class="main" id="main">
		<a href="#main"><div id="js-backtop" class="back-top">回到<br/>顶部</div></a>
		<h2>webpack分享</h2>
		<div class="share-person">
			<span>分享人：judy</span>
		</div>
		<div>
			<h4>前言</h4>
			<p>此次分享目的在于理清webpack的使用逻辑，以便更好，更容易的编写和扩展自己项目所需的配置文件，如果想要了解更详细的概念，配置信息和api，请参考官方文档<a href="https://doc.webpack-china.org/api/" target="_blank">官方文档</a></p>
		</div>
		<div>
			<h4>从以下四方面来做分享</h4>
			<ul class="ul-list">
				<li><a href="#a1">什么是webpack？</a></li>
				<li><a href="#a2">为什么要使用webpack，webpack能解决什么问题？</a></li>
				<li><a href="#a3">webpack的四个核心概念</a></li>
				<li><a href="#a4">对webpack主要配置项的分析</a></li>
				<li><a href="#a5">辅助开发技巧</a></li>
			</ul>
		</div>
		<br/>
		<br/>
		<br/>
		<div class="content">
			<section id="a1">
				<h3 class="h3-title">什么是webpack？</h3>
				<p>是构建工具，还是打包工具？</p>
				<p>官网的解释：本质上，webpack是现代javascript应用程序的模块打包器，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。</p>
				<code>
					<h4><strong>在解释webpack之前，我们先来了解一下其他几个概念:</strong></h4>	
					<ul class="ul-txt">
						<li>seajs/requirejs: 都是模块加载框架，可以实现JavaScript模块化开发及加载机制。
							<br/>SeaJS基于CMD规范。requirejs基于AMD规范。
							<br/>是一种在线"编译" 模块的方案
							<br/>原理: 相当于在页面上加载一个 CMD/AMD 解释器,这样浏览器就认识了 define、exports、module 这些东西，也就实现了模块化。
							<br/>解决两个问题：
							<br/>1）实现js文件的异步加载，避免网页失去响应
							<br/>2）管理模块之间的依赖性，便于代码的编写和维护<a href="http://www.jianshu.com/p/09ffac7a3b2c" target="_blank">三种模块化书写规范</a>
							<br/>在RequireJS 的方案中，非JavaScript 模块的资源虽然得到了支持，但支持得并不完善。
						</li>
						<li>browserify/webpack
							<br/>browserify支持CommonJS规范。webpack同时支持CommonJS和AMD模块。
							<br/>预编译模块打包方案，不需要在浏览器中加载解释器
							<br/>browserify是一个以在浏览器中使用Node.js 模块为出发点的工具。通过各种transform 插件实现不同类型资源的引入与打包。
							<br/>browserify两大特点： 
							<br/>1）对CommonJS 规范（Node.js 模块所采用的规范）的模块代码进行的转换与包装。 
							<br/>2）对很多Node.js 的标准package 进行了浏览器端的适配，只要是遵循CommonJS 规范的JavaScript 模块，即使是纯前端代码，也可以使用它进行打包。
							<br/>webpack是一个为前端模块打包构建而生的工具。它既吸取了大量已有方案的优点与教训，也解决了很多前端开发过程中已存在的痛点，如代码的拆分与异步加载、对非JavaScript资源的支持等。与browserify 的transform 相对应的是loader，但是功能更加丰富。强大的loader设计使得它更像是一个构建平台，而不只是一个打包工具。
						</li>
						<li>Gulp/Grunt: 是自动化任务构建工具，能够优化前端工作流程。比如自动刷新页面、压缩css、js、编译less等。
							<br/>是通过一系列插件将原本复杂繁琐的任务（Task）自动化，并不能将你的 css 等非 js 资源模块化，它与 webpack 之间有一定的功能重合，比如打包、压缩混淆、图片转base64等，但它们的目的跟要解决的问题是不一样的。
						</li>
					</ul>    
				</code>
				<p><strong>webpack的特性：</strong></p>
				<div  class="ul-txt">
				<p>1)任何东西均是模块。所有通过下面方式引进的资源(图片、css, js等)都是模块。</p>
				<code>
					<ul class="ul-txt">
						<li>ES2015 import 语句(webpack2开始内置支持)</li>
						<li>CommonJS require() 语句</li>
						<li>AMD define 和 require 语句</li>
						<li>css/sass/less 文件中的 @import 语句</li>
						<li>样式(url(...))或 HTML 文件(img src=...)中的图片链接(image url)</li>
					</ul>
				</code>
				<p>2)同时支持CommonJS和AMD模块。对于熟悉RequireJS或者是node.js的同学来说是个巨大的福利，我们可以按照自己的习惯选择适合自己编写代码的方式。</p>
				<p>3)内置插件机制丰富。提供了对CoffeeScript、ES6的支持，同时也可以使用webpack-dev-server做测试服务器，调试起来非常方便。</p>
				<p>4)支持对CSS、图片等资源进行打包，完成了gulp的部分功能。</p>
				<p>5)在内存完成打包。效率更高，能够满足开发过程中实时打包的需求。</p>
				<p>6)可以将代码切割成不同的chunk。实现按需加载，降低了初始化时间</p>
				<p>7)支持 SourceUrls 和 SourceMaps。易于调试</p>
				<p>8)具有强大的Plugin接口。大多是内部插件，使用起来比较灵活</p>
				<p>9)webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快</p>
				<p>10)有独立的配置文件webpack.config.js</p>
				</div>
				<p>所以webpack不仅仅是一个工具，而是前端的整体工程化方案。</p>
				
				<h4 class="h4title">让一切变得简单</h4>
				<img width="100%" src="http://images.gitbook.cn/974636d0-8c46-11e7-a6d5-cdf15ad8429c">
			</section>
			<br/>
			<br/>
			<section id="a2">
				<h3 class="h3-title">为什么要使用webpack，webpack能解决什么问题？</h3>
				<p><strong>背景：</strong>近年来，前端技术蓬勃发展，移动设备的广泛使用，移动应用也越来越多，因此对前端性能，效率上的要求也越来越高，我们想在js更方便的实现html，社区就出现了jsx,我们觉得原生的css不够好用，社区就提出了scss,less，针对前端项目越来越强的模块化开发需求，社区出现了AMD,CommonJS,ES2015,import等等方案。遗憾的是，这些方案大多并不直接被浏览器支持，往往伴随这些方案而生的还有另外一些，让这些新技术应用于浏览器的方案，我们用babel来转换下一代的js，转换jsx;我们用各种工具转换scss,less为css；我们发现项目越来越复杂，代码体积越来越大，又要开始寻找各种优化，压缩，分割方案。前端工程化这个过程，真是让我们大费精力。我们也大多是在寻找前端模块化解决方案的过程中知晓了webpack。<p>
				<!-- <p>的确，webpack的流行得益于野性生长的前端，其本质是一种前端模块化打包解决方案，但是更重要的是它又是一个可以融合运用各种前端新技术的平台，明白webpack的使用哲学后，只需要简单的配置,我们就可以随心所欲的在webpack项目中使用jsx/ts,使用babel/postcss等平台提供的众多其它功能，只需通过一条命令由源码构建最终可用文件。可以不夸张的说webpack为前端的工程化开发提供了一套相对容易和完整的解决方案。一些知名的脚手架工具，也大多基于webpack(比如vue-cli, create-react-app)。</p> -->
				<!-- <p>如何看待webpack：webpack好难！我第一次复制别人的配置文件到我的项目中，发现以自己仅有的JS知识完全看不懂时，也有这种感觉。后来发现有这种感觉其实是因为自己看待webpack的角度错了，对大多数前端开发者而言，以往我们接触的各种库，要么类似jQuery,通过$符在前端项目中直接运行，所做的事情只在前端生效，要么类似express.js,在node.js项目中直接require后就可以使用，所做的事情只在后端生效。webpack的不同之处就在于，虽然我们的配置文件位于前端项目中，但实际上它却运行于node.js，之后的处理结果又供前端使用（也可能供node使用）。所以学习之前，我们转变一下思维，从node.js的角度来看webpack，很多事情就会简单起来。</p>
				<p>对比 Node.js 模块，webpack 模块能够以各种方式表达它们的依赖关系</p> -->
				<!-- <p>我们对下图一定不陌生，假设现在我们手中有一系列相互关联的文件js,jsx,css,less,jpg，我们一步步的看看为了把它们转换为项目最终需要的，浏览器可识别的文件，webpack都做了什么。</p> -->
				<img src="../assets/images/8.png">
				<p><strong>webpack在web开发中主要解决的问题：</strong></p>
				<p>文件依赖管理。毕竟现在都是模块化开发，打包工具首先就是要梳理文件之间的依赖关系。</p>
				<p>资源加载管理。web本质就是html、js和css的文件组合，文件的加载顺序（先后时机）和文件的加载数量（合并、嵌入、拆分）也是打包工具重点要解决的问题。</p>
				<p>效率与优化管理。提高开发效率，即写最少的代码，做最好的效果展示；尽可能的使用工具，减少机械coding和优化页面效果，这个也是考验打包工具的点。</p>
			</section>
			<br/>
			<br/>
			<section id="a3">
				<h3 class="h3-title">webpack的四个核心概念</h3>
				<p>分别是入口(entry)，输出(output)，loader，插件（plugin）</p>
				<p><strong>入口起点：</strong>指示webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。</p>
				<p><strong>output：</strong>属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。你可以通过在配置中指定一个 output 字段，来配置这些处理过程</p>
				<p><strong>loader：</strong>让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理</p>
				<p><strong>插件：</strong>loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。</p>
				<img width="80%" src="../assets/images/code1.png">
			</section>
			<section id="a4">
				<h3 class="h3-title">对webpack主要配置项的分析</h3>
				<div>
					<h4 class="h4-title">入口配置entry</h4>
					<p>规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。</p>
					<p>命名：如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。</p>
					<p>形式：字符串，数组，对象</p>
					<img  width="80%" src="../assets/images/9.png">
					<p>这里的数组类型，如果你想添加多个彼此不互相依赖的文件，可以这样使用：</p>
					<p>以下代码的意思是：你可能在html文件里引用了“googleAnalytics.js”文件，可以告诉Webpack将其加到bundle.js的最后</p>
					<img width="50%" src="../assets/images/10.png">
					<p><small>这里重点说下入口文件在单页应用项目来说，分为业务代码和第三方代码，业务代码会频繁改动，而第三方代码一般改动较少，如果每次修改业务代码都需要用户将整个js文件都重新下载一遍，对于加载性能来讲是不可取的，所以一般而言我们会将代码分为业务代码和第三方代码分别进行打包，虽然多了一个请求的文件，增加了一些网络开销，但是相比于浏览器能将文件进行缓存而言，这些开销是微不足道的。</small></p>
					<p>我们在entry中定义了app入口，相应的业务逻辑都封装在这个入口文件里，如果我们想要第三方代码独立出来，就要再增加一个入口，我们习惯使用vendor这个命名。</p>
					<code>
						例如：<br/>
						entry: {<br/>
    					&nbsp;&nbsp;&nbsp;&nbsp;app: 'app/app.js',<br/>
    					&nbsp;&nbsp;&nbsp;&nbsp;vendor: ['vue', 'vuex']
    					<br/>
  					}
					</code>
				</div>
				<div>
					<h4 class="h4-title">输出配置output</h4>
					<p>output配置项作用于打包文件的输出阶段，其作用在于告知webpack以何种方式输出打包文件.配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个输出配置。</p>
					<p>基本配置包括filename和path两项</p>
					<code>
						例如：<br/>
						{
						<br/>
					    entry:{
					    <br/>
					        &nbsp;&nbsp;&nbsp;&nbsp;main:'./src/index.js'
					        <br/>
					    },
					    <br/>
					    output:{
					    <br/>
					        &nbsp;&nbsp;&nbsp;&nbsp;path: path.join(__dirname,'./dist'), // 打包文件存放路径<br/>
					        &nbsp;&nbsp;&nbsp;&nbsp;filename:'js/bundle-[name]-[hash].js', // 指定打包后的文件名字和基本的引用路径<br/>
					        &nbsp;&nbsp;&nbsp;&nbsp;chunkFilename:'js/[name].chunk.js', // 指定非入口文件名称, 未被列在entry中，却又需要被打包出来的文件命名配置<br/>
					        &nbsp;&nbsp;&nbsp;&nbsp;publicPath: options.dev ? '/assets/' : publicPath // 这里可能会区分开发环境和生产环境，比如生产环境用cdn的地址。。。
					        <br/>
					    }
						}
					</code>
				</div>
				<div>
					<h4 class="h4-title">module的配置</h4>
					<h6>module.rules</h6>
					<p>一方面webpack只能解析js文件，另一方面浏览器也可能会不支持一些最新的js语法，因此引入了loader</p>
					<p>loader用来把一些模块进行预处理，loader的主要在module.rules中进行，module.rules是一个数组，可以把每一项看作一个rule，每个rule主要做两件事</p>
					<p>1,识别出应该被对应的 loader 进行转换的那些文件。 Rule.test属性 // 匹配规则</p>
					<p>2,转换这些文件，从而使其能够被添加到依赖图中（并且最终添加到 bundle 中）。 Rule.use // 针对匹配的文件将使用的处理loader</p>
					<h6>module.noParse</h6>
					<p>module.noParse是 webpack 的另一个很有用的配置项，如果你 确定一个模块中没有其它新的依赖 就可以配置这项，webpack 将不再扫描这个文件中的依赖。
						<br/>也就是说防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。
						<br/>忽略大型的 library 可以提高构建性能。
					</p>
				</div>
				<div>
					<h4 class="h4-title">plugins的配置</h4>
					<p>webpack 插件列表，plugins是一个数组，数组的每一项都是某一个plugins实例</p>
					<p>plugins分为内置插件和第三方插件</p>
					<h6 class="h6-title">常用plugins的介绍</h6>
					<p>
						<br/><span class="span-title">对代码进行处理</span>
						<br/><strong>BannerPlugin:</strong>给代码添加版权信息，如在plugins数组中添加new BannerPlugin(‘judy’)后能在打包生成的所有文件前添加注释judy。
						<br/><strong>CommonsChunkPlugin:用于抽离代码，具有多种用途。</strong>
						<ul class="ul-txt">
							<li>抽离不同文件的共享代码，减少chunk间的重复代码，有效利用缓存。</li>
							<li>抽离可能整个项目都在使用的第三方模块，比如vue vuex。</li>
							<li>将多个子chunk中的共用代码打包进父chunk或使用异步加载的单独chunk。</li>
							<li>抽离Manifest这类每次打包都会变化的内容，减轻打包时候的压力，提升构建速度。</li>
						</ul>
						<small>理解两个概念：
							<br/>runtime 以及伴随的 manifest 数据： 在浏览器运行时，webpack 用来连接模块化的应用程序的所有代码
							<br/>runtime: 在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。
							<br/>manifest: （由来：打包的模块加载到浏览器中，webpack是如何管理所有模块之间的交互）当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点，数据集合称为manifest
						</small>
						<br/>
						<img  width="60%" src="../assets/images/6.jpeg">
						<img width="60%" src="../assets/images/7.jpeg">
						<br/>new webpack.optimize.CommonsChunkPlugin({
								<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names: ['vendor', 'manifest']
  							<br/>})
  							<br/><small>这里的name可以选择已经存在的块，这里就选择了vendor块，因为我们本来就是将vendor块当做管理第三方代码的入口的。
								而names传入一个数组，数组里包含两个trunk name，表示CommonsChunkPlugin插件会执行两次这个方法，第一次将公共的第三方代码抽离移到vendor的块中，这个过程之前也讲过会将运行时runtime也转移到vendor块中，第二次执行则是将运行时runtime抽离出来转移到manifest块中。这步操作解决了缓存问题。
								<br/>这样处理，最后会生成3个打包文件chunk，app.js是业务代码，vendor则是公共的第三方代码，manifest.js则是运行时。
							</small>
							<br/>
							<br/>通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，以便存起来到缓存中供后续使用。
							<br/>
						<br/><strong>CompressionWebpackPlugin:</strong>使用配置的算法（如gzip）压缩打包生成的文件。
						<br/><strong>DefinePlugin:</strong>创建一个在编译时可配置的全局常量,如果你自定义了一个全局变量PRODUCTION,可在此设置其值来区分开发还是生产环境。
						<br/><strong>EnvironmentPlugin:</strong>实际上是DefinePlugin插件中对process.env进行设置的简写形式，如new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG'])将设置process.env.NODE_ENV='DEBUG'。
						<br/><strong>ExtractTextWebpackPlugin:</strong>抽离css文件为单独的css文件。
						<br/><strong>ProvidePlugin:</strong>全局自动加载模块，如添加new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'})后,则全局不用在导入jquery就可以直接使用$。
						<br/><strong>UglifyjsWebpackPlugin:</strong>使用前需要先安装，基于UglifyJS压缩代码，支持其所有配置, 它和 webpack 核心插件 (webpack.optimize.UglifyJSPlugin) 是同一个插件。
						<br/>
						<br/><span class="span-title">辅助输出打包后的代码</span>
						<br/><strong>HtmlWebpackPlugin:</strong>使用前需要先安装，为你自动生成一个html文件，该文件将自动依据entry的配置引入依赖，如果你的文件名中添加了[hash]等占位符，这将非常有用。
						<br/><strong>CleanWebpackPlugin:</strong>使用前需要先安装，此插件允许你在配置以后，每次打包时，清空所配置的文件夹，如果你每次打包的文件名不同，这将非常有用。
					</p>
				</div>
				<div>
					<h4 class="h4-title">其它的一些配置</h4>
					<h6 class="h6-title">辅助开发的相关属性</h6>
					<div>
						<strong>devServer:</strong>
						<p>通过配置devServer选项，你可以开启一个本地服务器，webpack为此本地服务器提供了非常多的配置选项，点击查看dev-server，你会发现通过合适的配置，你可以拥有所有本地服务器可提供的功能。</p>
						<strong>devtool:</strong>
						<p>打包后的代码和原始的代码往往存在较大的差异，此选项控制是否生成，以及如何生成 source map，用以帮助你进行调试。
							<br/>
							<small>开发环境推荐：cheap-module-eval-source-map
							<br/>生产环境推荐：cheap-module-source-map (这也是下版本 webpack 使用-d命令启动 debug 模式时的默认选项)
							</small>
						</p>
						<strong>watch:</strong>
						<p>启用 Watch 模式后，webpack 将持续监听任何已解析文件的更改，重新构建文件，Watch 模式默认关闭，在开发时候如果开启会很方便。</p>
						<p>webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。</p>
						<strong>performance:</strong>
						<p>本配置让你设置打包后命令行中该如何展示性能提示，比如是否开启提示，资源如果超过某个大小时该警告还是报错，详见	<a href="https://doc.webpack-china.org/configuration/performance/" target="_blank">performance</a>。</p>
						<strong>stats:</strong>
						<p>本选项让你配置打包过程中输出的内容，如没有输出none，标准输出normal，全部输出verbose，只输出错误errors-only等等。</p>
					</div>
					<h6 class="h6-title">精细配置相关属性</h6>
					<div>
						<strong>content:</strong>
						<p>设置基础路径，默认使用当前目录。</p>
						<strong>resolve:</strong>
						<p>确定模块如何被解析，webpack已经提供了合理的默认值，不过通过你的自定义配置，可以对模块解析实现更加精细的控制，如对某些常用模块可以通过设置别名(把用户的一个请求重定向到另一个路径)以更容易引用，也可在此处设置可被忽略的后缀名</p>
						<p><small>resolve 用来配置文件路径的指向。
							<br/>可以定义文件跟模块的默认路径及后缀等，节省 webpack 搜索文件的时间、优化引用模块时的体验。常用的包括alias、extensions、root、modulesDirectories属性
							<br/>alias：是个对象，把资源路径重定向到另一个路径
							<br/>extensions：是个数组，定义资源的默认后缀
							<br/>root：是个数组，通过绝对路径的方式来定义查找模块的文件夹
							<br/>modulesDirectories：是个数组，是用来设置搜索的目录名的，默认值:["web_modules", "node_modules"]
						</small>
							例如：
							<br/>
							<code>
							resolve: {
						    <br/>&nbsp;&nbsp;alias: {
						        <br/>&nbsp;&nbsp;&nbsp;&nbsp;moment: "moment/min/moment-with-locales.min.js"
						    <br/>&nbsp;&nbsp;}
						  <br/>}
						</code>	
					  <br/>这样待打包的脚本中的 require('moment'); 其实就等价于 require('moment/min/moment-with-locales.min.js');
						</p>
						<strong>target:</strong>
						<p>告知 webpack 需要打包的代码执行的环境，针对 node 和 web 打包过程会有所不同。</p>
						<strong>externals:</strong>
						<p>外部扩展，让打包生成的代码中不添加某依赖项，而让这些依赖项直接从用户环境中获取,在进行库的开发时非常有用。</p>
						<p>防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。</p>
						<p>
							<code>externals: {
						<br/>&nbsp;&nbsp;jquery: 'jQuery'
						<br/>}</code>
					  </p>
						<!-- <strong>node:</strong>
						<p>是一个对象，其中每个属性都是 Node.js 全局变量或模块的名称,每一项的设置值都可以是（true/mock/empty/false）中的一种，以确定这些node中的对象在其它环境中是否可用。
						此外webpack还具备其它一些用的比较少的配置对象。</p> -->
					</div>
				</div>
			</section>
			<br/>
			<br/>
			<section id="a5">
				<h3 class="h3-title">辅助开发技巧</h3>
				<p>1、简化路径，定义路径别名：</p>
				<p>resolve.alias：创建 import 或 require 的别名，来确保模块引入变得更简单；
				<br/>resolve.extensions：自动解析确定的扩展，能够使用户在引入模块的时候不带扩展；</p>	
				<p>2、webpack中常见的占位符:</p>	
				<ul class="ul-txt">
					<li>[name]：代表打包后文件的名称，在entry或代码中(之后会看到)确定；</li>
					<li>[id]：webpack给块分配的内部chunk id，如果你没有隐藏，你能在打包后的命令行中看到；</li>
					<li>[hash]：每次构建过程中，生成的唯一 hash 值；</li>
					<li>[chunkhash]： 依据于打包生成文件内容的 hash 值,内容不变，值不变；</li>
					<li>[ext]： 资源扩展名,如js,jsx,png等等；</li>
				</ul>
				<!-- <p>3、loader还可以实现</p>
				<ul class="ul-txt">
					<li>转换编译：script-loader/babel-loader/ts-loader/coffee-loader等。</li>
					<li>处理样式：style-loader/css-loader/less-loader/sass-loader/postcss-loader等。</li>
					<li>处理文件：raw-loader/url-loader/file-loader/等。</li>
					<li>处理数据：csv-loader/xml-loader等。</li>
					<li>处理模板语言：html-loader/pug-loader/jade-loader/markdown-loader等。</li>
					<li>清理和测试：mocha-loader/eslint-loader等</li>
				</ul> -->
			</section>
			
			<br/>
			<p>最后来一张打包后的依赖关系图</p>
			<img width="100%" src="../assets/images/smallweb.png">
			<br/>
			<br/>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
			}
		}
	}
</script>

<style type="text/css" lang="less">
h2, h3, h4 {font-weight: 300;}
ul {padding: 0;margin: 0;}
ul li {list-style: none;}
dl dt {line-height: 30px;}
code {background: #DCF2FD;}
a {
	color: #2086d7;
	text-decoration: none;

	&:hover {
		color:  #8DD6F9;
	}
}
p {
	font-size: 14px;
	font-weight: 300;
	line-height: 30px;
}
.main {
	position: relative;
	width: 1000px;
	margin: 0 auto;
	font-weight: 300;
	margin-bottom: 100px;
}
.back-top {
	position: fixed;
	bottom: 30px;
	left: 50%;
	margin-left: 550px;
	width: 50px;
	height: 50px;
	border: 1px solid #dcdcdc;
	text-align: center;
	line-height: 25px;
	cursor: pointer;
	color: #000;
	font-weight: 300;
}
.h4title {
	text-align: center;
}
.h3-title {
	padding: 0 10px;
	color: #fff;
	background: rgba(32, 134, 215, 0.8);
}
.h4-title {
	margin-top: 50px;
	padding-bottom: 10px;
	text-align: center;
	border-bottom: 1px solid #dcdcdc;
}
.h6-title {
	color: #8DD6F9;
	font-size: 16px;
}
.span-title {
	color:  #8DD6F9;
}
.share-person {
	padding-bottom: 15px;
	border-bottom: 1px solid #efefef;

	span {
		font-size: 12px;
	}
}
.ul-list {
	background: #DCF2FD;
	padding-left: 10px;

	li {
		line-height: 30px;
		font-size: 16px;
	}
}
.ul-txt {
	background: #DCF2FD;
	padding-left: 20px;

	li {
		list-style: unset;
		line-height: 30px;
		font-size: 14px;
	}
}
</style>

