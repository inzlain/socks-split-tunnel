# Split Tunneling While Pivoting Through SOCKS On An Implant
This is a collection of Proxy Auto-Configuration (PAC) files to perform split tunneling for bandwidth heavy web applications while proxying traffic through an implant (i.e. SOCKS pivoting browser traffic using stolen sessions via C2).

## Problem
When operating in mature environments, C2 channels tend to be trending towards lower bandwith options to evade detection (i.e. tunneling C2 traffic over some other third party API). Simultaneously, web applications are only continuing to become mroe bandwidth heavy and more interactive (i.e. high numbers of web requests). This means that pivoting browser traffic through an implant can become very hard to use in certain contrained C2 situations.

## Solution
A lot of the web requests that go to most web applications are mundane things like fetching static resources (i.e. large in size) and user analytics (i.e. many requests). These requests are often unauthenticated and don't send session tokens, so proxying these requests via an implant is often unnecessary in many cases. If we can identify these types of requests, then we can instead route requests to them via a higher bandwidth channel. This reduces the load of the traffic being proxied via the C2 channel used by the implant, resulting in a more usable browser experience for the operator.

A simple solution to implement this type of split tunneling is the use of a PAC file that includes a list of requests to _not_ route via the SOCKS proxy on the implant.

## Risks
There is an obvious risk with performing this type of split tunneling in that now your requests to the web application are coming from two different sources. Potentially, this pattern of network traffic could be signaturable by either the provider of the web applicaiton (i.e. the SaaS provider), or via network traffic analysis in the target environment (i.e. with TLS inspection it would be possible to see a difference in the requests sent compared to full traffic tunneling).
