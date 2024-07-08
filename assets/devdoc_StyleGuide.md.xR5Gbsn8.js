import{_ as s,c as e,o as i,V as a}from"./chunks/framework.gBlNPWt_.js";const u=JSON.parse('{"title":"Coding conventions","description":"","frontmatter":{},"headers":[],"relativePath":"devdoc/StyleGuide.md","filePath":"devdoc/StyleGuide.md","lastUpdated":1720186852000}'),t={name:"devdoc/StyleGuide.md"},n=a(`<h1 id="coding-conventions" tabindex="-1">Coding conventions <a class="header-anchor" href="#coding-conventions" aria-label="Permalink to &quot;Coding conventions&quot;">​</a></h1><h2 id="why-coding-conventions" tabindex="-1">Why coding conventions? <a class="header-anchor" href="#why-coding-conventions" aria-label="Permalink to &quot;Why coding conventions?&quot;">​</a></h2><p>Everyone has their own ideas of what the best code formatting style is, but most would agree that code in a mixture of styles is the worst of all worlds. A consistent coding style makes unfamiliar code easier to understand and navigate.</p><p>In an ideal world, the HPCC sources would adhere to the coding standards described perfectly. In reality, there are many places that do not. These are being cleaned up as and when we find time.</p><h2 id="c-coding-conventions" tabindex="-1">C++ coding conventions <a class="header-anchor" href="#c-coding-conventions" aria-label="Permalink to &quot;C++ coding conventions&quot;">​</a></h2><p>Unlike most software projects around, HPCC has some very specific constraints that makes most basic design decisions difficult, and often the results are odd to developers getting acquainted with its code base. For example, when HPCC was initially developed, most common-place libraries we have today (like STL and Boost) weren&#39;t available or stable enough at the time.</p><p>Also, at the beginning, both C++ and Java were being considered as the language of choice, but development started with C++. So a C++ library that copied most behaviour of the Java standard library (At the time, Java 1.4) was created (see jlib below) to make the transition, if ever taken, easier. The transition never happened, but the decisions were taken and the whole platform is designed on those terms.</p><p>Most importantly, the performance constraints in HPCC can make no-brainer decisions look impossible in HPCC. One example is the use of traditional smart pointers implementations (such as boost::shared_ptr or C++&#39;s auto_ptr), that can lead to up to 20% performance hit if used instead of our internal shared pointer implementation.</p><p>The last important point to consider is that some libraries/systems were designed to replace older ones but haven&#39;t got replaced yet. There is a slow movement to deprecate old systems in favour of consolidating a few ones as the elected official ways to use HPCC (Thor, Roxie) but old systems still could be used for years in tests or legacy sub-systems.</p><p>In a nutshell, expect re-implementation of well-known containers and algorithms, expect duplicated functionality of sub-systems and expect to be required to use less-friendly libraries for the sake of performance, stability and longevity.</p><p>For the most part out coding style conventions match those described at <a href="http://geosoft.no/development/cppstyle.html" target="_blank" rel="noreferrer">http://geosoft.no/development/cppstyle.html</a>, with a few exceptions or extensions as noted below.</p><h3 id="source-files" tabindex="-1">Source files <a class="header-anchor" href="#source-files" aria-label="Permalink to &quot;Source files&quot;">​</a></h3><p>We use the extension .cpp for C++ source files, and .h or .hpp for header files. Header files with the .hpp extension should be used for headers that are internal to a single library, while header files with the .h extension should be used for the interface that the library exposes. There will typically be one .h file per library, and one .hpp file per cpp file.</p><p>Source file names within a single shared library should share a common prefix to aid in identifying where they belong.</p><p>Header files with extension .ipp (i for internal) and .tpp (t for template) will be phased out in favour of the scheme described above.</p><h3 id="java-style" tabindex="-1">Java-style <a class="header-anchor" href="#java-style" aria-label="Permalink to &quot;Java-style&quot;">​</a></h3><p>We adopted a Java-like inheritance model, with macro substitution for the basic Java keywords. This changes nothing on the code, but make it clearer for the reader on what&#39;s the recipient of the inheritance doing with it&#39;s base.</p><ul><li><strong>interface</strong> (struct): declares an interface (pure virtual class)</li><li><strong>extends</strong> (public): One interface extending another, both are pure virtual</li><li><strong>implements</strong> (public): Concrete class implementing an interface</li></ul><p>There is no semantic check, which makes it difficult to enforce such scheme, which has led to code not using it intermixed with code using it. You should use it when possible, most importantly on code that already uses it.</p><p>We also tend to write methods inline, which matches well with C++ Templates requirements. We, however, do not enforce the one-class-per-file rule.</p><p>See the <a href="#interfaces">Interfaces</a> section for more information on our implementation of interfaces.</p><h3 id="identifiers" tabindex="-1">Identifiers <a class="header-anchor" href="#identifiers" aria-label="Permalink to &quot;Identifiers&quot;">​</a></h3><p>Class and interface names are in CamelCase with a leading capital letter. Interface names should be prefixed capital I followed by another capital. Class names may be prefixed with a C if there is a corresponding I-prefixed interface name, e.g. when the interface is primarily used to create an opaque type, but need not be otherwise.</p><p>Variables, function and method names, and parameters use camelCase starting with a lower case letter. Parameters may be prefixed with underscore when the parameter is used to initialize a member variable of the same name. Common cases are constructors and setter methods.</p><p>Example:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MySQLSuperClass</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> haslocalcopy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mySQLFunctionIsCool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> _haslocalcopy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bool</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> enablewrite</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (enablewrite)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            haslocalcopy </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> _haslocalcopy;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><h3 id="pointers" tabindex="-1">Pointers <a class="header-anchor" href="#pointers" aria-label="Permalink to &quot;Pointers&quot;">​</a></h3><p>Use real pointers when you can, and smart pointers when you have to. Take extra care on understanding the needs of your pointers and their scope. Most programs can afford a few dangling pointers, but a high-performance clustering platform cannot.</p><p>Most importantly, use common sense and a lot of thought. Here are a few guidelines:</p><ul><li>Use real pointers for return values, parameter passing.</li><li>For .md variables use real pointers if their lifetime is guaranteed to be longer than the function (and no exception is thrown from functions you call), shared pointers otherwise.</li><li>Use <code>Shared</code> pointers for member variables - unless there is a strong guarantee the object has a longer lifetime.</li><li>Create <code>Shared&lt;X&gt;</code> with either: <ul><li><code>Owned&lt;X&gt;</code>: if your new pointer will take ownership of the pointer</li><li><code>Linked&lt;X&gt;</code>: if you are sharing the ownership (shared)</li></ul></li></ul><p>Warning: Direct manipulation of the ownership might cause <code>Shared&lt;&gt;</code> pointers to lose the pointers, so subsequent calls to it (like <code>o2-&gt;doIt()</code> after o3 gets ownership) <strong>will</strong> cause segmentation faults.</p><p>Refer to [Reference counted objects]{.title-ref} for more information on our smart pointer implementation, <code>Shared&lt;&gt;</code>.</p><p>Methods that return pointers to link counted objects, or that use them, should use a common naming standard:</p><ul><li>Foo * queryFoo() Does not return a linked pointer since lifetime is guaranteed for a set period. Caller should link if it needs to retain it for longer.</li><li>Foo * getFoo() Returned value is linked and should be assigned to an owned, or returned directly.</li><li>void setFoo(Foo * x) Generally parameters to functions are assumed to be owned by the caller, the callee needs to link them if they are retained.</li><li>void setFoo(Foo * ownedX) Some calls do transfer ownership of parameters - the parameter should be named to indicate this. If the function only has a single signficant parameter then sometimes the name of the function indicates the ownership.</li></ul><h3 id="indentation" tabindex="-1">Indentation <a class="header-anchor" href="#indentation" aria-label="Permalink to &quot;Indentation&quot;">​</a></h3><p>We use 4 spaces to indent each level. TAB characters should not be used.</p><p>The { that starts a new scope and the corresponding } to close it are placed on a new line by themselves, and are not indented. This is sometimes known as the Allman or ANSI style.</p><h3 id="comments" tabindex="-1">Comments <a class="header-anchor" href="#comments" aria-label="Permalink to &quot;Comments&quot;">​</a></h3><p>We generally believe in the philosophy that well written code is self-documenting. Comments are also encouraged to describe <em>why</em> something is done, rather than how - which should be clear from the code.</p><p>javadoc-formatted comments for classes and interfaces are being added.</p><h3 id="classes" tabindex="-1">Classes <a class="header-anchor" href="#classes" aria-label="Permalink to &quot;Classes&quot;">​</a></h3><p>The virtual keyword should be included on the declaration of all virtual functions - including those in derived classes, and the override keyword should be used on all virtual functions in derived classes.</p><h3 id="namespaces" tabindex="-1">Namespaces <a class="header-anchor" href="#namespaces" aria-label="Permalink to &quot;Namespaces&quot;">​</a></h3><p>MORE: Update!!!</p><p>We do not use namespaces. We probably should, following the Google style guide&#39;s guidelines - see <a href="http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml#Namespaces" target="_blank" rel="noreferrer">http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml#Namespaces</a></p><h3 id="other" tabindex="-1">Other <a class="header-anchor" href="#other" aria-label="Permalink to &quot;Other&quot;">​</a></h3><p>We often pretend we are coding in Java and write all our class members inline.</p><h3 id="c-11" tabindex="-1">C++11 <a class="header-anchor" href="#c-11" aria-label="Permalink to &quot;C++11&quot;">​</a></h3><h2 id="other-coding-conventions" tabindex="-1">Other coding conventions <a class="header-anchor" href="#other-coding-conventions" aria-label="Permalink to &quot;Other coding conventions&quot;">​</a></h2><h3 id="ecl-code" tabindex="-1">ECL code <a class="header-anchor" href="#ecl-code" aria-label="Permalink to &quot;ECL code&quot;">​</a></h3><p>The ECL style guide is published separately.</p><h3 id="javascript-xml-xsl-etc" tabindex="-1">Javascript, XML, XSL etc <a class="header-anchor" href="#javascript-xml-xsl-etc" aria-label="Permalink to &quot;Javascript, XML, XSL etc&quot;">​</a></h3><p>We use the commonly accepted conventions for formatting these files.</p><hr><h1 id="design-patterns" tabindex="-1">Design Patterns <a class="header-anchor" href="#design-patterns" aria-label="Permalink to &quot;Design Patterns&quot;">​</a></h1><h2 id="why-design-patterns" tabindex="-1">Why Design Patterns? <a class="header-anchor" href="#why-design-patterns" aria-label="Permalink to &quot;Why Design Patterns?&quot;">​</a></h2><p>Consistent use of design patterns helps make the code easy to understand.</p><h3 id="interfaces" tabindex="-1">Interfaces <a class="header-anchor" href="#interfaces" aria-label="Permalink to &quot;Interfaces&quot;">​</a></h3><p>While C++ does not have explicit support for interfaces (in the java sense), an abstract class with no data members and all functions pure virtual can be used in the same way.</p><p>Interfaces are pure virtual classes. They are similar concepts to Java&#39;s interfaces and should be used on public APIs. If you need common code, use policies (see below).</p><p>An interface&#39;s name must start with an &#39;I&#39; and the base class for its concrete implementations should start with a &#39;C&#39; and have the same name, ex:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CFoo : implements IFoo { };</span></span></code></pre></div><p>When an interface has multiple implementations, try to stay as close as possible to this rule. Ex:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CFooCool : implements IFoo { };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CFooWarm : implements IFoo { };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CFooALot : implements IFoo { };</span></span></code></pre></div><p>Or, for partial implementation, use something like this:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CFoo : implements IFoo { };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CFooCool : public CFoo { };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CFooWarm : public CFoo { };</span></span></code></pre></div><p>Extend current interfaces only on a &#39;is-a&#39; approach, not to aggregate functionality. Avoid pollution of public interfaces by having only the public methods on the most-base interface in the header, and internal implementation in the source file. Prefer pImpl idiom (pointer-to-implementation) for functionality-only requirements and policy based design for interface requirements.</p><p>Example 1: You want to decouple part of the implementation from your class, and this part does not implements the interface your contract requires.:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">interface IFoo</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    virtual</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Following is implemented in a separate private file...</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CFoo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : implements IFoo</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MyImpl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pImpl;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    virtual</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">override</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { pImpl-&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">doSomething</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>Example2: You want to implement the common part of one (or more) interface(s) in a range of sub-classes.:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">interface ICommon</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    virtual</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> common</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">interface IFoo : extends ICommon</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    virtual</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">interface IBar : extends ICommon</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    virtual</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IFACE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Base</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : implements IFACE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    virtual</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> common</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">override</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ... };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Still virtual</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CFoo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Base</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IFoo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> foo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">override</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CBar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Base</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IBar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> bar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">override</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>NOTE: Interfaces deliberately do not contain virtual destructors. This is to help ensure that they are never destroyed by calling delete directly.</p><h3 id="reference-counted-objects" tabindex="-1">Reference counted objects <a class="header-anchor" href="#reference-counted-objects" aria-label="Permalink to &quot;Reference counted objects&quot;">​</a></h3><p><code>Shared&lt;&gt;</code> is an in-house intrusive smart pointer implementation. It is close to boost&#39;s intrusive_ptr. It has two derived implementations: <code>Linked</code> and <code>Owned</code>, which are used to control whether the pointer is linked when a shared pointer is created from a real pointer or not, respectively. Ex:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Owned</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Foo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> myFoo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Foo;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Take owenership of the pointers</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Linked</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Foo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> anotherFoo </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> myFoo;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Shared ownership</span></span></code></pre></div><p><code>Shared&lt;&gt;</code> is thread-safe and uses atomic reference count handled by each object (rather than by the smart pointer itself, like boost&#39;s shared_ptr).</p><p>This means that, to use <code>Shared&lt;&gt;</code>, your class must implement the Link() and Release() methods - most commonly by extending the CInterfaceOf&lt;&gt; class, or the CInterface class (and using the IMPLEMENT_IINTERFACE macro in the public section of your class declaration).</p><p>This interface controls how you Link() and Release() the pointer. This is necessary because in some inner parts of HPCC, the use of a &quot;really smart&quot; smart pointer would add too many links and releases (on temporaries, local variables, members, etc) that could add to a significant performance hit.</p><p>The CInterface implementation also include a virtual function beforeDispose() which is called before the object is deleted. This allows resources to be cleanly freed up, with the full class hierarchy (including virtual functions) available even when freeing items in base classes. It is often used for caches that do not cause the objects to be retained.</p><h3 id="stl" tabindex="-1">STL <a class="header-anchor" href="#stl" aria-label="Permalink to &quot;STL&quot;">​</a></h3><p>MORE: This needs documenting</p><h1 id="structure-of-the-hpcc-source-tree" tabindex="-1">Structure of the HPCC source tree <a class="header-anchor" href="#structure-of-the-hpcc-source-tree" aria-label="Permalink to &quot;Structure of the HPCC source tree&quot;">​</a></h1><p>MORE!</p><p>Requiring more work: * namespaces * STL * c++11 * Review all documentation * Better examples for shared</p>`,84),l=[n];function o(h,r,p,d,c,k){return i(),e("div",null,l)}const E=s(t,[["render",o]]);export{u as __pageData,E as default};
