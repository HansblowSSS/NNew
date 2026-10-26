# Desktop Light — Missing Image Generation Prompts

> Save generated images to: `C:\Zuopin\NNew\public\images\works\desktop-light\generated\`

> ⚠️ **Important**: All generated images must strictly follow the original product design:
> - Dark matte charcoal/almost-black cylindrical body
> - Cylindrical silhouette — NO square, NO spherical, NO other shapes
> - Visible seam between top and bottom cylindrical sections
> - Horizontal warm amber/orange glowing strip in the MIDDLE section
> - NO extra buttons, knobs, stands, or decorations
> - Warm white / dark grey / amber color palette only

---

## 1. Warm Light Glow Macro Close-up

**Save as:** `generated/light-glow-macro.jpg`
**Aspect ratio:** 1:1 (2048×2048)
**Section:** 05 Light Experience — second image (glowing strip close-up)

### Prompt
```
A photorealistic macro close-up of a dark cylindrical desk lamp showing the warm amber glowing strip that runs horizontally through the middle section of the lamp body. The lamp is matte dark charcoal (almost black). The glowing strip emits a soft warm amber-orange light (approximately 2700K) that spills softly onto the surrounding surfaces and creates a visible contrast with the dark body. Shallow depth of field. Background is pure black. Studio product photography, soft box lighting, ultra-sharp detail on the lamp surface texture. Cinematic mood, no harsh reflections. High-end industrial design photography.
```

---

## 2. Layered Structure Close-up (Top/Bottom Sections)

**Save as:** `generated/layer-detail.jpg`
**Aspect ratio:** 1:1 (2048×2048)
**Section:** 03 Detail — third image tile (structure detail)

### Prompt
```
A photorealistic close-up product shot of a dark cylindrical desk lamp showing the visible seam and structural division between the top cylinder section and the bottom base section. The lamp sits on a dark surface. Top section is slightly lighter charcoal, bottom base is darker charcoal. The warm amber light glow is visible in the middle connecting area creating contrast. Studio lighting, black background, ultra-clean product photography style. The structural detail and material finish should be clearly visible.
```

---

## 3. Modern Minimal Desk Scene

**Save as:** `generated/scene-desk.jpg`
**Aspect ratio:** 16:9 (2048×1152 or wider)
**Section:** 06 In Context — primary scene image

### Prompt
```
A photorealistic wide-angle shot of a sleek modern workspace. A dark cylindrical desk lamp with a warm amber glowing middle section sits on a dark walnut or matte black desk. Background is a softly lit, minimalist room with warm-toned walls and dark furniture. Evening/late afternoon atmosphere. The lamp is the main subject, softly illuminating the immediate desk area with warm amber light. Cinematic, editorial product photography style. High-end lifestyle imagery. No people visible. Ultra-clean composition.
```

---

## 4. Quiet Bedroom Nightstand Scene

**Save as:** `generated/scene-bedroom.jpg`
**Aspect ratio:** 16:9 (2048×1152 or wider)
**Section:** 06 In Context — secondary scene variant

### Prompt
```
A photorealistic lifestyle shot of a quiet, dark bedroom at night. A dark cylindrical desk lamp with a warm amber glowing middle section sits on a dark wooden nightstand. The room has warm ambient lighting from the lamp creating a pool of warm light on the nightstand surface. Dark grey or charcoal bedding, minimalist decor. The lamp is the main light source creating an intimate, warm atmosphere. Cinematic, editorial photography. High-end product lifestyle. No people visible. Ultra-clean composition, dark moody atmosphere.
```

---

## Post-Generation Steps

1. Save all generated images to `C:\Zuopin\NNew\public\images\works\desktop-light\generated\`
2. Update `src/data/desktopLight.ts` to reference the generated images:
   - `dlLight.image2` → `/images/works/desktop-light/generated/light-glow-macro.jpg`
   - Detail third tile → `/images/works/desktop-light/generated/layer-detail.jpg`
   - `dlContext.image` → `/images/works/desktop-light/generated/scene-desk.jpg` (and add second scene image)
3. Run `npm run dev` and verify all images load
4. Run `npm run build` to confirm no errors
