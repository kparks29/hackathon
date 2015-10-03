### Shared utilities for HOMDNA.

#### Installation

**1) Install via bower (or download via git/manually):**
```
bower install --save https://github.com/homdna/client-common.git#v0.2-alpha
```

**2) Include the script:**
```
<script src="{bower_components}/HOMDNA.common/dist/homdna-common.js"></script>
```

**3) Add the modules as a dependency of your app:**
```
angular.app('myApp', ['HOMDNA.utils']);
```

Currently there are two main modules, each with factories under them:
* HOMDNA.common.utils
* HOMDNA.common.documents (which depends on utils)

**4) Inject the factories into your controllers, etc.**
```
function ($localStorage)
```

Testing, style guide, linting, etc. should all follow thes same guidelines as [homdna-mobile](https://github.com/homdna/homdna-mobile#style-guide)