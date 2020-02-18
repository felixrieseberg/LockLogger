$currentuser = gwmi -Class win32_computersystem | Select-Object -ExpandProperty username
$process = get-process logonui -ea silentlycontinue

if ($currentuser -and $process) {
  Write-Output '{ "locked": true }'
} else {
  Write-Output '{ "locked": false }'
}
