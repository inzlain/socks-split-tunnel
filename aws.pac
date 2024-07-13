// This is the SOCKS proxy that routes traffic via your implant
var implant = "SOCKS5 127.0.0.1:7000"

// This is the SOCKS proxy that routes traffic out via your secondary Internet path
var not_implant = "SOCKS5 127.0.0.1:8080"
// Uncomment to use direct egress is this is suitable for your use case
// var not_implant = "DIRECT"

function FindProxyForURL(url, host) { 
    // Requests for static resources that don't need authentication
    if (shExpMatch(host, "(*.cdn.console.awsstatic.com)") ||
        dnsDomainIs(host, "global.ccs.amazonaws.com") ||
        dnsDomainIs(host, "d2q66yyjeovezo.cloudfront.net") || // images
        shExpMatch(url, "https://global.console.aws.amazon.com/lotus/metadata?*") || // request includes account ID in URL parameters but doesn't send authentication cookies
        shExpMatch(host, "(*.console.aws.a2z.com)") // this is telemetry that does a lot of requests - note that it *does* send authentication cookies (i.e. a potential opsec issue if you are super paranoid)
        ) 
        return not_implant; 

    // All other traffic goes via the implant
    return implant;
}
