import{_ as e,c as a,o as t,V as s}from"./chunks/framework.gBlNPWt_.js";const b=JSON.parse('{"title":"HPCC git support","description":"","frontmatter":{},"headers":[],"relativePath":"devdoc/GitAuthenticate.md","filePath":"devdoc/GitAuthenticate.md","lastUpdated":1720186852000}'),n={name:"devdoc/GitAuthenticate.md"},i=s(`<h1 id="hpcc-git-support" tabindex="-1">HPCC git support <a class="header-anchor" href="#hpcc-git-support" aria-label="Permalink to &quot;HPCC git support&quot;">​</a></h1><p>Version 8.4 of the HPCC platform allows package files to define dependencies between git repositories and also allows you to compile directly from a git repository.</p><p>E.g.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>ecl run hthor --main demo.main@ghalliday/gch-ecldemo-d#version1 --server=...</span></span></code></pre></div><p>There are no futher requirements if the repositories are public, but private repositories have the additional complication of supplying authentication information. Git provides various methods for providing the credentials...</p><h2 id="credentials-for-local-development" tabindex="-1">Credentials for local development <a class="header-anchor" href="#credentials-for-local-development" aria-label="Permalink to &quot;Credentials for local development&quot;">​</a></h2><p>The following are the recommended approaches configuring the credentials on a local development system interacting with github:</p><ol><li>ssh key.</li></ol><p>In this scenario, the ssh key associated with the local developer machine is registered with the github account. For more details see <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh" target="_blank" rel="noreferrer">https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh</a></p><p>This is used when the github reference is of the form ssh://github.com. The sshkey can be protected with a passcode, and there are various options to avoid having to enter the passcode each time.</p><p>It is preferrable to use the https:// protocol instead of ssh:// for links in package-lock.json files. If ssh:// is used it requires any machine that processes the dependency to have access to a registered ssh key.</p><ol start="2"><li>github authentication</li></ol><p>Download the GitHub command line tool (<a href="https://github.com/cli/cli" target="_blank" rel="noreferrer">https://github.com/cli/cli</a>). You can then use it to authenticate all git access with</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>gh auth login</span></span></code></pre></div><p>Probably the simplest option if you are using github. More details are found at <a href="https://cli.github.com/manual/gh_auth_login" target="_blank" rel="noreferrer">https://cli.github.com/manual/gh_auth_login</a></p><ol start="3"><li>Use a personal access token</li></ol><p>These are similar to a password, but with additional restrictions on their lifetime and the resources that can be accessed.</p><p>Details on how to to create them are found : <a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" target="_blank" rel="noreferrer">https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token</a></p><p>These can then be used with the various git credential caching options. E.g. see <a href="https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage" target="_blank" rel="noreferrer">https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage</a></p><h2 id="configuring-eclccserver" tabindex="-1">Configuring eclccserver <a class="header-anchor" href="#configuring-eclccserver" aria-label="Permalink to &quot;Configuring eclccserver&quot;">​</a></h2><p>All of the options above are likely to involve some user interaction - passphrases for ssh keys, web interaction with github authentication, and initial entry for cached access tokens. This is problematic for eclccserver - which cannot support user interaction, and it is preferrable not to pass credentials around.</p><p>The solution is to use a personal access token securely stored as a secret. (This would generally be associated with a special service account.) This avoids the need to pass credentials and allows the keys to be rotated.</p><p>The following describes the support in the different versions:</p><h2 id="kubernetes" tabindex="-1">Kubernetes <a class="header-anchor" href="#kubernetes" aria-label="Permalink to &quot;Kubernetes&quot;">​</a></h2><p>In Kubernetes you need to take the following steps:</p><p>a) add the gitUsername property to the eclccserver component in the value.yaml file:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>eclccserver:</span></span>
<span class="line"><span>- name: myeclccserver</span></span>
<span class="line"><span>  gitUsername: ghalliday</span></span></code></pre></div><p>b) add a secret to the values.yaml file, with a key that matches the username:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>secrets:</span></span>
<span class="line"><span>  git:</span></span>
<span class="line"><span>    ghalliday: my-git-secret</span></span></code></pre></div><p>note: this cannot currently use a vault - probably need to rethink that. (Possibly extract from secret and supply as an optional environment variable to be picked up by the bash script.)</p><p>c) add a secret to Kubernetes containing the personal access token:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Secret</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: my-git-secret</span></span>
<span class="line"><span>type: Opaque</span></span>
<span class="line"><span>stringData:</span></span>
<span class="line"><span>  password: ghp_eZLHeuoHxxxxxxxxxxxxxxxxxxxxol3986sS=</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>kubectl apply -f ~/dev/hpcc/helm/secrets/my-git-secret</span></span></code></pre></div><p>When a query is submitted to eclccserver, any git repositories are accessed using the user name and password.</p><h2 id="bare-metal" tabindex="-1">Bare-metal <a class="header-anchor" href="#bare-metal" aria-label="Permalink to &quot;Bare-metal&quot;">​</a></h2><p>Bare-metal require some similar configuration steps:</p><p>a) Define the environment variable HPCC_GIT_USERNAME</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>export HPCC_GIT_USERNAME=ghalliday</span></span></code></pre></div><p>b) Store the access token in /opt/HPCCSystems/secrets/git/$HPCC_GIT_USERNAME/password</p><p>E.g.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$cat /opt/HPCCSystems/secrets/git/ghalliday/password</span></span>
<span class="line"><span>ghp_eZLHeuoHxxxxxxxxxxxxxxxxxxxxol3986sS=</span></span></code></pre></div>`,41),o=[i];function p(r,c,l,h,d,u){return t(),a("div",null,o)}const m=e(n,[["render",p]]);export{b as __pageData,m as default};
