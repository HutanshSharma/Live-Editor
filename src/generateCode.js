export function generateCode(html,css,js){
    return  `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<base target="_self">
<style>${css}</style>
<script defer>
  document.addEventListener('DOMContentLoaded', function() {
    try {
      ${js}
    } catch (err) {
      console.error(err);
    }
  });
</script>
</head>
<body>
${html}
</body>
</html>`
}

const dhtml = `
<h1>Hello World</h1>
<p class="text">Your code will be displayed here</p>
`

const dcss = `
body {
    background-color: antiquewhite;
    font-family: 'Courier New', Courier, monospace;
}
`

const djs = `
text = document.querySelector('.text')
text.style.color = 'red'
`


export const defaultcode =`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<base target="_self">
<style>${dcss}</style>
<script defer>
  document.addEventListener('DOMContentLoaded', function() {
    try {
      ${djs}
    } catch (err) {
      console.error(err);
    }
  });
</script>
</head>
<body>
${dhtml}
</body>
</html>
`
export const defaultdata={
    html:dhtml,
    css:dcss,
    js:djs
}
