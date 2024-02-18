import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as d,c as l,a as t,d as a,b as n,e as r}from"./app-f5953329.js";const i={},c=r('<h2 id="工作六年-我学会了用-arthas-来辅助我的日常工作" tabindex="-1"><a class="header-anchor" href="#工作六年-我学会了用-arthas-来辅助我的日常工作" aria-hidden="true">#</a> 工作六年，我学会了用 Arthas 来辅助我的日常工作</h2><p><em>很久就想写一篇介绍 Arthas 的文章，虽然 Arthas 已有大量文章介绍；但我依然想结合我的实际工作，来聊聊这款我喜爱的 Java 监控诊断产品。</em></p><blockquote><p>🔊一位 Java 开发者的使用总结，只谈使用经验，不聊原理。</p></blockquote><h2 id="📆-那些辛酸的过往" tabindex="-1"><a class="header-anchor" href="#📆-那些辛酸的过往" aria-hidden="true">#</a> 📆 那些辛酸的过往</h2><p><strong><em>历历在目的场景</em>🥹</strong>(❁´◡<code>❁)(❁´◡</code>❁)</p><ul><li>客户线上问题，应该如何复现，让客户再点一下吗？</li><li>异常被吃掉，手足无措，看是哪个家伙写的，竟然是自己！</li><li>排查别人线上的 bug，不仅代码还没看懂，还没一行日志，捏了一把汗！</li><li>预发 debug，稍微时间长点，群里就怨声载道！</li><li>加日志重新部署，半个小时就没了，问题还没有找到，头顶的灯却早已照亮了整层楼......</li><li>线上机器不能 debug，也不能开 debug 端口，重新部署会不会破坏现场呢?</li><li>怀疑入参有问题，怀疑合并代码有问题，怀疑没有部署成功，全是问号......</li><li>一个问题排查一天，被 Diss 排查问题慢......</li></ul><blockquote><p><em>直到我遇到了 Arthas，那些曾经束手无策的问题，都变得轻而易举。于是想把这些遇到的场景和用法做个总结。</em></p></blockquote><h2 id="📕一、通过命令执行方法-vmtool" tabindex="-1"><a class="header-anchor" href="#📕一、通过命令执行方法-vmtool" aria-hidden="true">#</a> 📕一、通过命令执行方法--vmtool</h2><p><strong>vmtool 命令是我最喜欢用的，也是用最多的一个命令。通过这个命令执行方法，检查各种不符合预期的分支逻辑，入参出参，以及各种外部依赖接口，甚至还能修改数据等。</strong></p><h4 id="_1-1-场景" tabindex="-1"><a class="header-anchor" href="#_1-1-场景" aria-hidden="true">#</a> 1.1 场景</h4><table><thead><tr><th>解决过的场景</th><th>具体描述</th></tr></thead><tbody><tr><td>发布导致线上的缓存 key 错误，需要清理，但过期时间还长，没有删除 key 的远程接口</td><td>通过执行 service 方法，删除缓存 key；另外读取 redis 中的 key 也极其方便</td></tr><tr><td>缺少日志，不知道上游是否返回数据合理</td><td>通过执行方法，确定依赖返回数据不正确</td></tr><tr><td>发布应用同时修改分布式配置，导致推送配置到该节点失败</td><td>通过执行方法，查询配置信息不是最新</td></tr><tr><td>常量值不符合预期，配置在 properties 中的免登 url 失效</td><td>通过执行方法，查询当前常量值，判断读取不合理</td></tr><tr><td>新增配置信息、删除脏数据</td><td>通过接口执行方法，添加了配置、删除了脏数据</td></tr><tr><td>集群环境，想要请求打在指定机器上查看日志</td><td>需要反复请求多次才能命中特定机器查看日志，通过vmtool 执行方法，快速实现日志查看</td></tr><tr><td>出参入参不符合预期</td><td>在调用链路上执行所有可疑方法</td></tr><tr><td>以前需要写 controller 调用触发的测试方法</td><td>直接用这个命令，减少代码，还能测试上下游的各种二方接口，十分方便</td></tr></tbody></table><p><em>案例还有很多很多，因为真的可以拿着入参尽情的 invoke</em></p><p>提升了排查问题、解决问题的效率，也帮助其他人解决他们的问题。不再依赖打印大量日志反复部署服务，也不再申请 debug 端口进行远程 debug ，因为确实方便。</p><h4 id="_1-2-使用" tabindex="-1"><a class="header-anchor" href="#_1-2-使用" aria-hidden="true">#</a> 1.2 使用</h4><p>工欲善其事必先利其器，我在 IDEA 装上一个 Arthas 插件，用它来快速复制命令，想执行哪个方法拷贝即可。</p><figure><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a19a329d1834bccab44454f811f01ec~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1563&amp;h=515&amp;s=88254&amp;e=png&amp;b=3c3f41" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><blockquote><p>上图是使用 Arthas 插件生成执行命令。光标放在执行方法上右击选择 vmtool 即可得到可运行命令。</p></blockquote><p><strong>情景一： 执行的方法是对象</strong>：需要对参数对象赋值，以下图中的方法为例：</p><figure><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da59573084794985be61f1da3bb246f7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2038&amp;h=430&amp;s=106438&amp;e=png&amp;b=3b3b3b" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p><code>queryIBCcContactConfig</code> 方法参数是对象， 首先通过 Arthas 工具查找到参数 <code>IbCcContactConfigParam</code> 的<strong>classLoaderHash</strong>， 如下命令：（sc -d 路径）</p><figure><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35d04f03ee5d44cfbdea15fec56b281e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1507&amp;h=1089&amp;s=629859&amp;e=png&amp;b=101010" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>对参数对象进行字段赋值,方式参考下面加粗部分（ognl方式）：</p><blockquote><p>vmtool  -x 3 -c 76707e36 --action getInstances --className com.xxx.impl.IbCcContactConfigServiceImpl --express &#39;instances[0].queryIbCcContactConfig(<strong>(#demo=new com.xxx.param.IbCcContactConfigParam(), #demo.setContactBizCode(&#39;12345L&#39;),#demo)</strong>)&#39;</p></blockquote><p>情景二、基础类型，比如String、Long、Int。直接填充数值即可</p><table><thead><tr><th>举例</th><th>语句</th><th>描述</th></tr></thead><tbody><tr><td>基础类型，比如String、Int、Long类型等</td><td>vmtool -x 3 --action getInstances --className com.xxl.mq.admin.service.IXxlMqMessageService --express &#39;instances[0].delete(0)&#39;</td><td>执行 IXxlMqMessageService#delete 方法，参数为0</td></tr><tr><td></td><td></td><td></td></tr></tbody></table><table><thead><tr><th>参数</th><th>解释</th></tr></thead><tbody><tr><td>-x 3</td><td>返回参数展开形式的，默认1，如果返回体是对象，建议设置3，方便观察返回结果</td></tr><tr><td>-c xxx</td><td>指定classLoaderHash，如果不指定，new 方法报错</td></tr></tbody></table><h4 id="_1-3-限制" tabindex="-1"><a class="header-anchor" href="#_1-3-限制" aria-hidden="true">#</a> 1.3 限制</h4><p>其一、尽量避开 ThreadLocal 。执行线程没有 ThreadLocal 的上下文；</p><p>其二、只能有一个端口，只支持一个arthas-server，用完及时关掉。</p><h4 id="_1-4-扩展" tabindex="-1"><a class="header-anchor" href="#_1-4-扩展" aria-hidden="true">#</a> 1.4 扩展</h4><p>使用 getstatic 命令查看静态变量</p>',31),p=t("thead",null,[t("tr",null,[t("th",null,"场景描述"),t("th",null,"语句执行"),t("th",null,"解释")])],-1),h=t("tr",null,[t("td",null,"查看静态变量的实际值"),t("td",null,"getstatic com.xxx.xxx.interceptor.env.EnvIsolationInterceptor FILL_FIELD_NAME -x 3"),t("td",null,"查看 EnvIsolationInterceptor # FILL_FIELD_NAME 的静态变量值")],-1),u=t("tr",null,[t("td",null,"配置application.properties的免登 uri，发现没有生效"),t("td",null,"getstatic com.xxx.sso.filter.InitParamContext excludeList -x 3"),t("td",null,"查看自己的免登 uri 是否在集合里面，从而快速定位问题")],-1),g=t("td",null,"修改静态变量值",-1),m={href:"https://link.juejin.cn?target=mailto%3Acom.xxl.mq.admin.conf.XxlMqBrokerImpl%40class.getDeclaredField",title:"mailto:com.xxl.mq.admin.conf.XxlMqBrokerImpl@class.getDeclaredField",target:"_blank",rel:"noopener noreferrer"},b=t("td",null,[t("img",{src:"https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d60784f5a53d4326917c49af16a3425d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1737&h=327&s=72781&e=png&b=3c3f41",alt:"image.png",loading:"lazy"})],-1),f=t("tr",null,[t("td"),t("td"),t("td")],-1),x=r(`<h2 id="🖥️二、热部署-redefine-retransform" tabindex="-1"><a class="header-anchor" href="#🖥️二、热部署-redefine-retransform" aria-hidden="true">#</a> 🖥️二、热部署 # redefine &amp;&amp; retransform</h2><p>😭<strong>拍桌子拍大腿感叹发布的的代码少写或者漏写；拍脑门惋惜为啥不多打一行日志；口吐芬芳为什么把判断条件写死......，那些只能发布才能调试、部署一次要半小时的应用，真的会让生命变得廉价。</strong></p><h4 id="_2-1-场景" tabindex="-1"><a class="header-anchor" href="#_2-1-场景" aria-hidden="true">#</a> 2.1 场景</h4><table><thead><tr><th>解决过的场景</th><th>描述</th></tr></thead><tbody><tr><td>加日志语句，入参出参观察</td><td>联调查看参数</td></tr><tr><td>将判断条件恒定成了 false，目标分支无法执行，阻塞进度</td><td>修改判断逻辑</td></tr><tr><td>漏写一行赋值代码</td><td>对象自己赋值给自己，字段值为NULL</td></tr><tr><td>研发、联调阶段，代码验证</td><td>需要反复修改代码验证</td></tr><tr><td>测试同学提Bug及时修复验证</td><td>快速修复问题，不影响测试进度</td></tr></tbody></table><p><strong>热部署的优势用过的都说好</strong>👍。</p><h4 id="_2-2-使用" tabindex="-1"><a class="header-anchor" href="#_2-2-使用" aria-hidden="true">#</a> 2.2 使用</h4><p>IDEA 集成 ArthasHotSwap 插件，方便快捷：</p><figure><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dd3e1fc0dc049e0af782fcf608dd915~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1295&amp;h=561&amp;s=128313&amp;e=png&amp;b=343638" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><blockquote><p>很多公司通过 API 方式已经集成了工具，定制化更好用😄。</p></blockquote><h4 id="_2-3-限制" tabindex="-1"><a class="header-anchor" href="#_2-3-限制" aria-hidden="true">#</a> 2.3 限制</h4><ul><li>不允许新增加 field/method</li><li>正在跑的函数，没有退出不能生效</li><li>redefine 和 watch/trace/jad/tt 等命令冲突</li></ul><p>热部署能力，是一个很强大的能力，线上谨慎使用，属于高危操作。</p><h2 id="📑三、ognl-条件过滤" tabindex="-1"><a class="header-anchor" href="#📑三、ognl-条件过滤" aria-hidden="true">#</a> 📑三、OGNL &amp;&amp; 条件过滤</h2><p><strong>顶流功能，可以使用 OGNL 解决很多复杂场景，其条件过滤属于绝佳。 适用于 watch、trace、stack、monitor等，有大量请求、 for 场景等。</strong></p><figure><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55686acfd0fc4ce18990387012c30be4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1019&amp;h=915&amp;s=412228&amp;e=png&amp;b=f9f9f9" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h4 id="_3-1-场景" tabindex="-1"><a class="header-anchor" href="#_3-1-场景" aria-hidden="true">#</a> 3.1 场景</h4><p>条件过滤的适用场景实在太多，简单举例</p><table><thead><tr><th>解决过的场景</th><th>描述</th></tr></thead><tbody><tr><td>想拦截特定参数值的方法入参出参，过滤其他参数请求</td><td>只有特定参数才会被拦截，否则跳过，不影响其他人使用</td></tr><tr><td>拦截特定参数，这个参数方法调用耗时长</td><td>排查到了参数异常情况，特定账号数据量太大</td></tr><tr><td>指定账号登录异常</td><td>通过监控指定 userId 的调用栈，排查问题</td></tr></tbody></table><h4 id="_3-2-使用" tabindex="-1"><a class="header-anchor" href="#_3-2-使用" aria-hidden="true">#</a> 3.2 使用</h4><p>条件判断形式：形如 params[0] == &quot;orgIdxxx726&quot; （OGNL）</p><table><thead><tr><th>场景</th><th>案例</th><th>描述</th></tr></thead><tbody><tr><td><strong>watch 命令</strong>：只监控特定组织的数据信息</td><td>watch com.xxx.controller.OrgServiceController getOrgInfo &#39;{params,returnObj,throwExp}&#39; &#39;params[0] == &quot;orgIdxxx726&quot;&#39; -n 5 -x 3</td><td>通过“ &#39;<strong>params[0] == &quot;orgIdxxx726</strong>&quot;&#39;”命令，判断只有当参数为“orgIdxxx726” watch 才生效</td></tr><tr><td><strong>trace 命令</strong>：只有特定组织的数据比较消耗时间</td><td>trace com.xxx.controller.OrgServiceController getOrgInfo &#39;params[0] == &quot;orgIdxxx726&quot;&#39; -n 5 --skipJDKMethod false</td><td>查询只要特定组织耗时长，忽略其他参数，精准定位</td></tr><tr><td><strong>stack 命令</strong>：查看调用栈，非常适合代理调用、AOP、Filter等</td><td>stack com.xxx.controller.OrgServiceController getOrgInfo &#39;params[0] == &quot;orgIdxxx726&quot;&#39; -n 5</td><td>排查调用链路</td></tr></tbody></table><p>更多使用条件判断的案例如下</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token operator">--</span> 判空
trace <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>xxx<span class="token punctuation">.</span>controller<span class="token punctuation">.</span></span>OrgServiceController</span> getOrgInfo&#39;params<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span>&#39;

<span class="token operator">--</span> 等于
trace <span class="token operator">*</span><span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>xxx<span class="token punctuation">.</span>controller<span class="token punctuation">.</span></span>OrgServiceController</span> getOrgInfo &#39;params<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1L</span>&#39;

<span class="token operator">--</span> 字符串不等于
trace <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>xxx<span class="token punctuation">.</span>controller<span class="token punctuation">.</span></span>OrgServiceController</span> getOrgInfo &#39;params<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token string">&quot;AA&quot;</span>&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OGNL 可以组合各种形式的条件判断。非常适合 watch、trace、stack 等场景。</p><h4 id="_3-3-扩展" tabindex="-1"><a class="header-anchor" href="#_3-3-扩展" aria-hidden="true">#</a> 3.3 扩展</h4>`,25),k={href:"https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Falibaba%2Farthas%2Fissues%2F11",title:"https://github.com/alibaba/arthas/issues/11",target:"_blank",rel:"noopener noreferrer"},_={href:"https://link.juejin.cn?target=https%3A%2F%2Farthas.aliyun.com%2Fdoc%2Fognl.html",title:"https://arthas.aliyun.com/doc/ognl.html",target:"_blank",rel:"noopener noreferrer"},v=r(`<h2 id="🔖-四、其他命令汇总" tabindex="-1"><a class="header-anchor" href="#🔖-四、其他命令汇总" aria-hidden="true">#</a> 🔖 四、其他命令汇总</h2><h4 id="_4-1-logger" tabindex="-1"><a class="header-anchor" href="#_4-1-logger" aria-hidden="true">#</a> 4.1 logger</h4><p>在写代码的时候，也可以刻意加 log.debug 级别的日志。日志级别一般为 info ,当需要排查问题的时候，可以修改日志级别为 debug。</p><table><thead><tr><th>解决过的场景</th><th>描述</th></tr></thead><tbody><tr><td>自定义日志失效，排查日志的实现类由哪个包引入或者提供</td><td>排查间接引入的日志依赖包</td></tr><tr><td>改变当前类的日志级别，查看日志</td><td>将 info 级别修改成 debug 级别</td></tr></tbody></table><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code>logger -n com.xxx.controller.OrgServiceControlle

通过sc 查看这个类的claasLoaderHash；

logger --name ROOT --level debug -c 4839ebd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-2-monitor" tabindex="-1"><a class="header-anchor" href="#_4-2-monitor" aria-hidden="true">#</a> 4.2 monitor</h4><p>监控某个方法的调用次数。包括调用次数，平均RT、成功率等信息。在性能调优使用：</p><div class="language-arduino line-numbers-mode" data-ext="arduino"><pre class="language-arduino"><code>monitor com<span class="token punctuation">.</span>XXXX<span class="token punctuation">.</span>handler<span class="token punctuation">.</span>HandlerManager <span class="token builtin">process</span>  <span class="token operator">-</span>n <span class="token number">10</span>  <span class="token operator">--</span>cycle <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-3-thread" tabindex="-1"><a class="header-anchor" href="#_4-3-thread" aria-hidden="true">#</a> 4.3 thread</h4><p>排查线程死锁，以及线程状态：</p><table><thead><tr><th>语句</th><th>详细</th></tr></thead><tbody><tr><td>thread -b</td><td>排查死锁情况，注意，当 Arthas 不能加载的时候，还是继续使用原来的 top 命令那一套排查问题</td></tr><tr><td>thread -n 3</td><td>查询当前最忙的 N 个线程</td></tr></tbody></table><h4 id="_4-4-jad-命令、反编译" tabindex="-1"><a class="header-anchor" href="#_4-4-jad-命令、反编译" aria-hidden="true">#</a> 4.4 jad 命令、反编译</h4><table><thead><tr><th>场景</th><th>描述</th></tr></thead><tbody><tr><td>排查 jar 中的 class 文件加载是否符合预期。比如：突然发现某一台机器上的执行结果和其他的机器的结果不一致。</td><td>怀疑机器部署异常</td></tr><tr><td>依赖包冲突，加载类不符合预期或者支合并的时候出错</td><td>检查运行的代码</td></tr></tbody></table><p>案例：springBoot 应用遇到 NoSuchMethodError 等问题，可以使用 Jad 反编译确认，看一下加载的类是否有问题。</p><h4 id="_4-5-watch" tabindex="-1"><a class="header-anchor" href="#_4-5-watch" aria-hidden="true">#</a> 4.5 watch</h4><p>watch 用来查看入参出参，配合 OGNL 条件过滤非常实用：</p><div class="language-arduino line-numbers-mode" data-ext="arduino"><pre class="language-arduino"><code>watch com<span class="token punctuation">.</span>xxl<span class="token punctuation">.</span>mq<span class="token punctuation">.</span>admin<span class="token punctuation">.</span>service<span class="token punctuation">.</span>IXxlMqMessageService pageList <span class="token char">&#39;{params,returnObj,throwExp}&#39;</span>  <span class="token operator">-</span>n <span class="token number">5</span>  <span class="token operator">-</span>x <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dc1a2af991c4f4282f3624ae0efddf9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1447&amp;h=443&amp;s=57064&amp;e=png&amp;b=ffffff" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>条件判断 #cost&gt;200(单位ms) 表示只有当耗时大于200ms才输出：</p><div class="language-arduino line-numbers-mode" data-ext="arduino"><pre class="language-arduino"><code>watch demo<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> primeFactors <span class="token char">&#39;{params, returnObj}&#39;</span> <span class="token char">&#39;#cost&gt;200&#39;</span> <span class="token operator">-</span>x <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果 x 设置超过 4 也就只展示4。使用 x=4 的情况比较常见，因为展开的信息最多。但需要注意线上数据量太大情况。</p><h4 id="_4-6-tt-time-tunnel" tabindex="-1"><a class="header-anchor" href="#_4-6-tt-time-tunnel" aria-hidden="true">#</a> 4.6 tt （Time Tunnel）</h4><p>tt 可以实现重做，实现方法调用；个人比较喜欢 vmtool，不过多介绍， tt 功能也十分强大。</p><h4 id="_4-7-用得不多的命令" tabindex="-1"><a class="header-anchor" href="#_4-7-用得不多的命令" aria-hidden="true">#</a> 4.7 用得不多的命令</h4><p>下面几个命令个人用得少，但很重要：</p>`,25),j=t("thead",null,[t("tr",null,[t("th",null,"命令"),t("th",null,"描述")])],-1),y=t("tr",null,[t("td",null,"memory"),t("td",null,"查看内存信息")],-1),w=t("tr",null,[t("td",null,"options"),t("td",null,"全局开关，jvm 比较高级少用的命令")],-1),q=t("tr",null,[t("td",null,"sysprop / sysenv"),t("td",null,"当前 JVM 的系统属性，环境属性")],-1),F=t("td",null,"profiler",-1),I={href:"https://link.juejin.cn?target=https%3A%2F%2Farthas.aliyun.com%2Fdoc%2Fprofiler.html",title:"https://arthas.aliyun.com/doc/profiler.html",target:"_blank",rel:"noopener noreferrer"},A=t("td",null,"dashboard",-1),L={href:"https://link.juejin.cn?target=https%3A%2F%2Farthas.aliyun.com%2Fdoc%2Fdashboard.html",title:"https://arthas.aliyun.com/doc/dashboard.html",target:"_blank",rel:"noopener noreferrer"},C=t("p",null,"其他命令就不再赘述了📎。",-1),O=t("h4",{id:"_4-8-arthas-插件功能",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_4-8-arthas-插件功能","aria-hidden":"true"},"#"),a(" 4.8 Arthas 插件功能")],-1),E=t("p",null,"Arthas 插件生成的命令如下：",-1),M=t("figure",null,[t("img",{src:"https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1eeb9c5772914b17b466ac427bb3e9a2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1745&h=1511&s=502786&e=png&b=fcfcfc",alt:"image.png",tabindex:"0",loading:"lazy"}),t("figcaption",null,"image.png")],-1),S={href:"https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FWangJi92%2Farthas-idea-plugin%2Fblob%2Fmaster%2FREADME.md",title:"https://github.com/WangJi92/arthas-idea-plugin/blob/master/README.md",target:"_blank",rel:"noopener noreferrer"},N={href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.yuque.com%2Farthas-idea-plugin%2Fhelp%2Fpwxhb4",title:"https://www.yuque.com/arthas-idea-plugin/help/pwxhb4",target:"_blank",rel:"noopener noreferrer"},z=t("h2",{id:"📌五、一些限制-注意事项",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#📌五、一些限制-注意事项","aria-hidden":"true"},"#"),a(" 📌五、一些限制 && 注意事项")],-1),D=t("ul",null,[t("li",null,"执行trace / tt 等命令时，本质上是在 method 的前后插入代码，会影响原来 JVM 里面 JIT 编译生成的代码。可能执行并发高的函数有抖动；"),t("li",null,"只能有一个端口，只支持一个 arthas-server；"),t("li",null,"热部署有限制且不一定能成功，线上属于高危操作；"),t("li",null,"如果服务不能响应，可能 Arthas 不能启动使用，需要使用 Linux 相关命令排查问题。")],-1),B=t("h2",{id:"📇六、好文推荐",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#📇六、好文推荐","aria-hidden":"true"},"#"),a(" 📇六、好文推荐")],-1),X={href:"https://link.juejin.cn?target=https%3A%2F%2Farthas.aliyun.com%2F",title:"https://arthas.aliyun.com/",target:"_blank",rel:"noopener noreferrer"},J={href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.yuque.com%2Farthas-idea-plugin%2Fhelp%2Fpe6i45",title:"https://www.yuque.com/arthas-idea-plugin/help/pe6i45",target:"_blank",rel:"noopener noreferrer"},T=t("h2",{id:"🧣七、最后的话",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#🧣七、最后的话","aria-hidden":"true"},"#"),a(" 🧣七、最后的话")],-1),H=t("p",null,[a("🖲要成为 Arthas 使用的好手，一定多多练习："),t("strong",null,"纸上得来终觉浅，绝知此事要躬行"),a("。")],-1),V={href:"https://juejin.cn/post/7291931708920512527#heading-2",target:"_blank",rel:"noopener noreferrer"};function G(P,R){const e=o("ExternalLinkIcon");return d(),l("div",null,[c,t("table",null,[p,t("tbody",null,[h,u,t("tr",null,[g,t("td",null,[a("ognl -x 3 '#field=@"),t("a",m,[a("com.xxl.mq.admin.conf.XxlMqBrokerImpl@class.getDeclaredField"),n(e)]),a(`("ENV"),#field.setAccessible(true),#field.set(null," ")'`)]),b]),f])]),x,t("p",null,[t("a",k,[a("更多灵活的用法"),n(e)])]),t("p",null,[t("a",_,[a("ognl | arthas"),n(e)])]),v,t("table",null,[j,t("tbody",null,[y,w,q,t("tr",null,[F,t("td",null,[t("a",I,[a("火焰图"),n(e)])])]),t("tr",null,[A,t("td",null,[t("a",L,[a("实时数据面板"),n(e)])])])])]),C,O,E,M,t("blockquote",null,[t("p",null,[a("注：图片来源于 "),t("a",S,[a("arthas 插件作者"),n(e)]),a("，插件和文章都很好🌺")])]),t("p",null,[a("针对插件的热部署配置详见： "),t("a",N,[a("(Hot Swap) Redefine 热更新支持"),n(e)]),a(")； 个人更推荐热部署用 ArthasHotSwap 插件。")]),z,D,B,t("ol",null,[t("li",null,[t("a",X,[a("官网文档"),n(e)])]),t("li",null,[t("a",J,[a("个人最推荐的学习资料： arthas idea plugin手册"),n(e)])])]),T,H,t("blockquote",null,[t("p",null,[a("参考链接："),t("a",V,[a("https://juejin.cn/post/7291931708920512527#heading-2"),n(e)]),a("，整理：沉默王二")])])])}const U=s(i,[["render",G],["__file","gongzlnwxklyarthaslfzwdrcgz.html.vue"]]);export{U as default};