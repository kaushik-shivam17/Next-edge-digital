<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap — Core Elite Digital</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #09090b; color: #e4e4e7; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; padding: 40px 20px; }
          .container { max-width: 860px; margin: 0 auto; }
          header { display: flex; align-items: center; gap: 16px; margin-bottom: 40px; padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.08); }
          header h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #fff; }
          header p { font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 2px; }
          .badge { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; background: rgba(202,163,83,0.15); color: #CAA353; border: 1px solid rgba(202,163,83,0.3); white-space: nowrap; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          thead tr { border-bottom: 1px solid rgba(255,255,255,0.08); }
          thead th { text-align: left; padding: 10px 14px; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
          tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s; }
          tbody tr:hover { background: rgba(255,255,255,0.03); }
          td { padding: 12px 14px; vertical-align: middle; }
          a { color: #CAA353; text-decoration: none; }
          a:hover { text-decoration: underline; color: #F0C97A; }
          .priority { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
          .p-high { background: rgba(202,163,83,0.15); color: #CAA353; }
          .p-mid  { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.5); }
          .p-low  { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.3); }
          .freq { font-size: 11px; color: rgba(255,255,255,0.3); text-transform: capitalize; }
          .url-text { word-break: break-all; }
          .count { margin-top: 28px; font-size: 11px; color: rgba(255,255,255,0.3); text-align: right; }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div>
              <h1>Core Elite Digital — Sitemap</h1>
              <p>XML Sitemap · Submitted to Google Search Console</p>
            </div>
            <span class="badge">
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
            </span>
          </header>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:variable name="pri" select="sitemap:priority"/>
                <tr>
                  <td class="url-text">
                    <a href="{sitemap:loc}" target="_blank" rel="noopener">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                  <td>
                    <span class="freq"><xsl:value-of select="sitemap:changefreq"/></span>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="$pri >= 0.9">
                        <span class="priority p-high"><xsl:value-of select="$pri"/></span>
                      </xsl:when>
                      <xsl:when test="$pri >= 0.7">
                        <span class="priority p-mid"><xsl:value-of select="$pri"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority p-low"><xsl:value-of select="$pri"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <p class="count">Generated for coreelitedigital.com</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
