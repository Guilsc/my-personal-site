# Channel & Format

## Purpose
Channel and Format determine the artifact schema. Curatia does not assume every Content Item is a text post.

## Adopted upstream skills
- `social-content`: baseline platform semantics for LinkedIn, Instagram, X, TikTok, Facebook and related social channels.
- `linkedin-carousel`: retain LinkedIn document/carousel mechanics as reference. Exclude hard-coded Vista Social profile IDs, Samin-specific configuration, and local tunnel workflow from generic Curatia behavior.
- `pixel-pal-carousel`: retain carousel composition/design-system concepts only when that specific style is selected. Do not make its creator aesthetic or locked model Curatia defaults.
- `short-form`: Reels/Shorts/TikTok repurposing.
- `youtube-content` and `youtube-outliner`: video transcript/content and outline patterns when YouTube is selected.

## Artifact contract
Curatia resolves:
`Channel -> Format -> Required Artifacts -> Optional Artifacts -> Ready validation`

Initial examples:
- Text post: text required, visual optional.
- Text + visual: text required, visual required.
- Image-led post: visual required, caption optional.
- Carousel: structured carousel artifact required, rendered/document visual required, caption optional.
- Video: video artifact required, caption optional.
- Newsletter/article: title/subject and body requirements according to format.

Changing format must not destroy existing artifacts. Existing artifacts may become context for generation in the new format.
