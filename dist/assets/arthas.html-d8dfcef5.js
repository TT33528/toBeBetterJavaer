import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as n,o as s,c as d,a as e,d as a,b as r,e as o}from"./app-f5953329.js";const c={},l=e("h1",{id:"第十六节-jvm-性能监控之-arthas-篇",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#第十六节-jvm-性能监控之-arthas-篇","aria-hidden":"true"},"#"),a(" 第十六节：JVM 性能监控之 Arthas 篇")],-1),h=e("p",null,"Arthas 是阿里开源的一款线上 Java 诊断神器，通过全局的视角可以查看应用程序的内存、GC、线程等状态信息，并且能够在不修改代码的情况下，对业务问题进行诊断，包括查看方法的参数调用、执行时间、异常堆栈等信息，大大提升了生产环境中问题排查的效率。",-1),p={href:"https://arthas.aliyun.com/doc/",target:"_blank",rel:"noopener noreferrer"},g=e("figure",null,[e("img",{src:"https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109102105.png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),u={href:"https://javabetter.cn/jvm/console-tools.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://javabetter.cn/jvm/view-tools.html",target:"_blank",rel:"noopener noreferrer"},b=o('<ul><li>客户线上问题，应该如何复现，让客户再点一下吗？</li><li>异常被吃掉，手足无措，看是哪个家伙写的，竟然是自己！</li><li>排查别人线上的 bug，不仅代码还没看懂，还没一行日志，捏了一把汗！</li><li>预发 debug，稍微时间长点，群里就怨声载道！</li><li>加日志重新部署，半个小时就没了，问题还没有找到，头顶的灯却早已照亮了整层楼......</li><li>线上机器不能 debug，也不能开 debug 端口，重新部署会不会破坏现场呢?</li><li>怀疑入参有问题，怀疑合并代码有问题，怀疑没有部署成功，全是问号......</li><li>一个问题排查一天，被 Diss 排查问题慢......</li></ul><p>星球里也有球友一直在呼唤 Arthas 的教程，那这篇内容我们就来详细地盘一盘。</p><h2 id="安装-arthas" tabindex="-1"><a class="header-anchor" href="#安装-arthas" aria-hidden="true">#</a> 安装 Arthas</h2><h3 id="macos-安装" tabindex="-1"><a class="header-anchor" href="#macos-安装" aria-hidden="true">#</a> macOS 安装</h3>',4),f={href:"https://arthas.aliyun.com/doc/download.html",target:"_blank",rel:"noopener noreferrer"},_={href:"https://paicoding.com/",target:"_blank",rel:"noopener noreferrer"},v=o(`<figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109104013.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>官方推荐的方式是通过 arthas-boot 来安装，那我们就按照这种来：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行完上述命令后，Arthas 会列出可以进行监控的 Java 进程，比如说下图中的第 2 个 <code>[2]: 79209 com.github.paicoding.forum.web.QuickForumApplication</code> 就是技术派的进程，直接输入 <code>2</code>，然后回车。Arthas 会连接到技术派的进程上，并输出带有 Arthas 的日志，进入 Arthas 的命令交互界面。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109104757.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="linux-安装" tabindex="-1"><a class="header-anchor" href="#linux-安装" aria-hidden="true">#</a> Linux 安装</h3><p>本地 OK 后，我们来试一下服务器上的项目，技术派是部署在腾讯云的香港服务器上，我们先登录到服务器上，然后执行下面的命令获取 arthas-boot.jar：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -O https://arthas.aliyun.com/arthas-boot.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后执行 <code>java -jar arthas-boot.jar</code>，Arthas 会列出可以进行监控的 Java 进程，我们输入 <code>1</code>，然后回车，Arthas 就会连接到技术派的进程上，并输出带有 Arthas 的日志，进入 Arthas 的命令交互界面。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109105744.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>OK，非常简单，相信大家都能搞定。</p><h3 id="idea-arthas-插件" tabindex="-1"><a class="header-anchor" href="#idea-arthas-插件" aria-hidden="true">#</a> IDEA Arthas 插件</h3><p>Arthas 也提供了 IDEA 插件，可以直接在 IDEA 中使用 Arthas，非常方便，我们来看看怎么安装。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109110348.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>官方文档：</p>`,15),x={href:"https://www.yuque.com/arthas-idea-plugin/help",target:"_blank",rel:"noopener noreferrer"},y=e("h2",{id:"arthas-常用命令",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#arthas-常用命令","aria-hidden":"true"},"#"),a(" Arthas 常用命令")],-1),j=e("p",null,"Arthas 提供了非常多的命令供我们使用，比如说和 JVM 相关的：",-1),A=e("li",null,[e("code",null,"dashboard"),a("：查看 JVM 的实时数据，包括 CPU、内存、GC、线程等信息。")],-1),w=e("li",null,[e("code",null,"jvm"),a("：查看 JVM 的信息，包括 JVM 参数、类加载器、类信息、线程信息等。")],-1),z=e("li",null,[e("code",null,"sysprop"),a("：查看和修改 JVM 的系统属性。")],-1),k=e("li",null,[e("code",null,"vmoption"),a("：查看和修改 JVM 的启动参数。")],-1),J=e("code",null,"heapdump",-1),I={href:"https://javabetter.cn/jvm/console-tools.html",target:"_blank",rel:"noopener noreferrer"},V=o("<p>比如说和类加载相关的：</p><ul><li><code>sc</code>：查看类的信息，包括类的结构、方法、字段等。</li><li><code>sm</code>：查看方法的信息，包括方法的参数、返回值、异常等。</li></ul><p>比如说和方法调用相关的：</p><ul><li><code>tt</code>：统计方法的调用次数和耗时。</li><li><code>trace</code>：跟踪方法的调用过程，包括方法的参数、返回值、异常等。</li><li><code>monitor</code>：监控方法的调用过程。</li></ul>",4),O={href:"https://arthas.aliyun.com/doc/commands.html",target:"_blank",rel:"noopener noreferrer"},D=o(`<h3 id="dashboard-命令" tabindex="-1"><a class="header-anchor" href="#dashboard-命令" aria-hidden="true">#</a> dashboard 命令</h3><p>dashboard 命令可以查看 JVM 的实时数据，包括线程、内存、线程、运行时参数等。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109112718.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="thread-命令" tabindex="-1"><a class="header-anchor" href="#thread-命令" aria-hidden="true">#</a> thread 命令</h3><p>thread 命令可以查看线程的信息，包括线程的状态、线程的堆栈等。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109113001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>thread 命令的参数如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 打印当前最忙的3个线程的堆栈信息
thread -n 3
# 查看ID为1的线程堆栈信息
thread 1
# 找出当前阻塞其他线程的线程
thread -b
# 查看指定状态的线程
thread -state WAITING
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sysprop-命令" tabindex="-1"><a class="header-anchor" href="#sysprop-命令" aria-hidden="true">#</a> sysprop 命令</h3><p>sysprop 命令可以查看和修改 JVM 的系统属性。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109113252.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>支持 TAB 键补全命令哈~</p><h3 id="logger-命令" tabindex="-1"><a class="header-anchor" href="#logger-命令" aria-hidden="true">#</a> logger 命令</h3><p>logger 命令可以查看和修改日志的级别，这个命令非常有用。</p><p>比如说生产环境上一般是不会打印 DEBUG 级别的日志的，但是有时候我们需要打印 DEBUG 级别的日志来排查问题，这个时候就可以使用 logger 命令来修改日志的级别。</p><p>第一步，先用 logger 命令查看默认使用的日志级别：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109113942.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>第二步，使用这个命令<code>logger --name ROOT --level DEBUG</code>，将日志级别修改为 DEBUG，再次查看日志级别，发现已经修改成功了：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109114316.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="sc-命令" tabindex="-1"><a class="header-anchor" href="#sc-命令" aria-hidden="true">#</a> sc 命令</h3><p>sc 命令可以查看类的信息，包括类的结构、方法、字段等。</p><p>示例 1：通过 <code>sc com.github.paicoding.forum.web.front.*</code> 查看包下的所有类：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109114902.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>示例 2：通过 <code>sc -d com.github.paicoding.forum.web.front.home.IndexController</code> 查看类的详细信息：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115043.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>示例 3：通过 <code>sc -d -f com.github.paicoding.forum.web.front.home.vo.IndexVo</code> 查看类的字段信息：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115332.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="jad-命令" tabindex="-1"><a class="header-anchor" href="#jad-命令" aria-hidden="true">#</a> jad 命令</h3><p>jad 命令可以反编译类的字节码，如果觉得线上代码和预期的不一致，可以反编译看看。</p><p>示例 1：通过 <code>jad com.github.paicoding.forum.web.front.home.IndexController</code> 反编译类的字节码：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115544.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="monitor-命令" tabindex="-1"><a class="header-anchor" href="#monitor-命令" aria-hidden="true">#</a> monitor 命令</h3><p>monitor 命令可以监控方法的执行信息，包括执行耗时等信息。</p><p>示例 1：通过 <code>monitor -c 3 com.github.paicoding.forum.web.front.home.IndexController index</code> 监控方法的执行信息，<code>-c</code> 参数表示监控的次数：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109115828.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="watch-命令" tabindex="-1"><a class="header-anchor" href="#watch-命令" aria-hidden="true">#</a> watch 命令</h3><p>watch 命令可以观察方法执行过程中的参数和返回值。</p><p>示例 1：通过 <code>watch com.github.paicoding.forum.web.front.home.IndexController index</code> 观察方法的执行过程中的参数和返回值：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109124522.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>Arthas 非常强大，还有很多插件可以配合使用，比如我们前面提到的 Arthas IDEA 插件，支持的命令还有以下这些：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109140000.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>文档写得也非常完整，我就不再赘述了，这篇内容也权当一个抛砖引玉。</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/arthas-20240109140405.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>等后面遇到线上问题了，再用 Arthas 来实战一把，给大家讲一讲。</p><p>推荐阅读：</p>`,46),E={href:"https://juejin.cn/post/7291931708920512527",target:"_blank",rel:"noopener noreferrer"},B={href:"https://juejin.cn/post/6844903999129419790",target:"_blank",rel:"noopener noreferrer"},M={href:"https://www.yuque.com/arthas-idea-plugin/help",target:"_blank",rel:"noopener noreferrer"},G=e("hr",null,null,-1),C={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},N={href:"https://javabetter.cn/overview/",target:"_blank",rel:"noopener noreferrer"},U=e("p",null,[a("微信搜 "),e("strong",null,"沉默王二"),a(" 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 "),e("strong",null,"222"),a(" 即可免费领取。")],-1),q=e("figure",null,[e("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function S(T,L){const t=n("ExternalLinkIcon");return s(),d("div",null,[l,h,e("p",null,[a("Arthas 的官方网站是 "),e("a",p,[a("https://arthas.aliyun.com/doc/"),r(t)]),a("，目前最新的版本是 3.7.2。")]),g,e("p",null,[a("比我们前面介绍的"),e("a",u,[a("命令行工具"),r(t)]),a("和"),e("a",m,[a("可视化工具"),r(t)]),a("，都要强大得多，如果你再遇到下面这些问题，就可以迎刃而解了。")]),b,e("p",null,[a("我们先在本地试一下哈，由于我本机是 macOS，所以我这里就以 macOS 为例，Windows 用户可以参考"),e("a",f,[a("官方文档"),r(t)]),a("，非常简单。")]),e("p",null,[a("我本机已经启动了"),e("a",_,[a("技术派"),r(t)]),a("项目，我们就以技术派为例，来看看 Arthas 的使用。")]),v,e("blockquote",null,[e("p",null,[e("a",x,[a("https://www.yuque.com/arthas-idea-plugin/help"),r(t)])])]),y,j,e("ul",null,[A,w,z,k,e("li",null,[J,a("：生成堆内存快照，类似于 "),e("a",I,[a("jmap"),r(t)]),a(" 命令。")])]),V,e("p",null,[a("我来带大家体验一些比较常用的命令，其他的命令大家可以参考"),e("a",O,[a("官方文档"),r(t)]),a("。")]),D,e("ul",null,[e("li",null,[e("a",E,[a("Arthas 的强大"),r(t)])]),e("li",null,[e("a",B,[a("Arthas 的热部署"),r(t)])]),e("li",null,[e("a",M,[a("IDEA Arthas 插件"),r(t)])])]),G,e("p",null,[a("GitHub 上标星 10000+ 的开源知识库《"),e("a",C,[a("二哥的 Java 进阶之路"),r(t)]),a("》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳："),e("a",N,[a("太赞了，GitHub 上标星 10000+ 的 Java 教程"),r(t)])]),U,q])}const H=i(c,[["render",S],["__file","arthas.html.vue"]]);export{H as default};