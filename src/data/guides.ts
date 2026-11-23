export interface Guide {
  slug: string;
  title: string;
  description: string;
  updated: string;
  body: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "compress-image-to-20kb-for-cnic",
    title: "How to compress an image to 20 KB for a CNIC upload in Pakistan",
    description: "A plain step by step guide to shrink a photo under 20 KB for NADRA and other CNIC uploads, without losing the face in the photo.",
    updated: "2026-11-23",
    body: [
      "Many CNIC forms in Pakistan ask for a photo under 20 KB. A phone photo is often 2 MB to 4 MB, so it is rejected at once. You do not need to guess a quality number. You need a tool that aims at the exact KB number and checks the real file size after each try.",
      "Start with a clear photo taken in daylight. Stand against a plain white wall. Keep your face in the centre of the frame. Do not use a photo with a dark background, a cap, or sunglasses. A clear source photo stays clear after compression. A dark or blurry source photo gets worse fast when the size drops.",
      "Open the tool on this site and drop your photo in the box. Pick 20 KB as the target. The tool first tries to keep the full size and lower the quality. If 20 KB is still out of reach, it steps the pixel size down in small stages. It keeps the highest quality that fits under 20 KB. You see the before size, the after size, and the pixel size on the same screen.",
      "Check the result before you upload it to the form. Open the downloaded file and look at the face. The eyes, nose, and mouth should still be clear. If the face looks blocky, start with a smaller source photo. Crop the photo tight around the head and shoulders first, then compress again. A tight crop wastes fewer KB on wall and sky.",
      "For NADRA, use a JPG file. Keep the size at 413 by 531 px when the form asks for passport size. If the form asks for a smaller size, use the size shown on that form page. Do not trust a size you saw on another site. Always check the official advertisement and the upload page itself, because requirements change from one form to the next.",
      "If the tool says it cannot reach 20 KB, do not force it. That happens with a very large photo or a photo with a lot of detail. Crop it tighter, take a new photo with less background, and try again. Do not upload a file over the limit and hope the form will accept it. Most portals in Pakistan reject the file at once and you lose the time you spent on the rest of the form."
    ]
  },
  {
    slug: "compress-photo-to-50kb-for-fpsc",
    title: "How to compress a photo to 50 KB for FPSC",
    description: "FPSC forms often ask for a photo under 50 KB. This guide shows the exact size, the right format, and the checks to run before you submit.",
    updated: "2026-11-23",
    body: [
      "FPSC is the Federal Public Service Commission. Its online form often asks for a photo under 50 KB and a signature under 20 KB. The exact limit is printed on the advertisement for each post, so read that page first. Do not use a limit from an old post. A limit that was right last year can be wrong for the post you want now.",
      "Use a recent passport size photo. The photo should be 35 by 45 mm, which is 413 by 531 px at 300 DPI. The background should be white. The face should fill most of the frame. Take the photo in daylight if you can. A photo taken at night with a flash often has hard shadows that look worse after compression.",
      "Drop the photo in the tool and pick 50 KB. The tool will aim at 50 KB and show the real result. If your source photo is 3 MB, the tool will lower the quality and, if needed, lower the pixel size. You do not need to pick a quality number by hand. The tool does the search for you and keeps the best quality that fits.",
      "Download the file and check three things. First, check the size in KB. It must be under 50 KB. Second, check the pixel size. It must match what the form asks for. Third, open the photo and look at the face. If the face is clear, you can upload it. If the face is blurry, crop the photo tighter and try again.",
      "Your signature needs the same care. Sign on white paper with a black pen. Take a clear photo of the signature or scan it. Crop it tight so there is no extra white space. Compress it to 20 KB with the same tool. A signature with a lot of white space wastes KB and looks faint after compression.",
      "Keep a copy of the final photo and signature in a folder on your phone. Name the files clearly, such as fpsc-photo-50kb.jpg and fpsc-sign-20kb.jpg. You will need the same files for the next FPSC post, and a clear folder saves time when the last date is close."
    ]
  },
  {
    slug: "compress-photo-to-50kb-for-ppsc",
    title: "How to compress a photo to 50 KB for PPSC",
    description: "PPSC forms in Punjab often ask for a photo under 50 KB. This guide covers the size, the format, and the common mistakes that cause a rejection.",
    updated: "2026-11-23",
    body: [
      "PPSC is the Punjab Public Service Commission. Its online form often asks for a photo under 50 KB. The limit is printed on the advertisement for the post you want. Read that advertisement first and note the photo size, the signature size, and the last date. Do not rely on a limit you saw for a different post.",
      "Start with a passport size photo on a white background. The photo should be recent. It should show your face clearly, with no cap and no sunglasses. If you wear glasses for the photo, make sure there is no glare on the lens. A photo with glare looks worse after compression and can cause a problem at the test centre.",
      "Use the tool on this site. Drop your photo, pick 50 KB, and press compress. The tool checks the real file size after each try. It keeps the highest quality that fits under 50 KB. You will see the old size and the new size side by side. That check matters, because a tool that only guesses the quality can give you a file that is still over the limit.",
      "After you download the file, check it on your phone. Open the file info and confirm the size is under 50 KB. Open the image and confirm the face is clear. If the image looks blocky, crop it tighter around the face and compress it again. A tight crop gives the tool more room to keep quality where it counts.",
      "Do the same steps for your signature. Sign with a black pen on plain white paper. Crop the signature tight. Compress it to 20 KB. A signature that is too light will look faint after compression, so use a pen with dark ink and press firmly.",
      "Save the final files with clear names. Keep them in one folder for PPSC forms. When the next PPSC post opens, you will not need to redo the photo work. You can check the new advertisement, confirm the limit is still 50 KB, and upload the same file."
    ]
  },
  {
    slug: "compress-image-to-100kb-for-job-portal",
    title: "How to compress an image to 100 KB for a job portal in Pakistan",
    description: "Job portals in Pakistan often reject photos over 100 KB. This guide shows how to hit 100 KB fast and keep the photo clear.",
    updated: "2026-11-23",
    body: [
      "Most job portals in Pakistan set a file size limit for a photo. A common limit is 100 KB. A phone photo is often 2 MB to 5 MB, so it is rejected at once. You need to shrink the file to under 100 KB before you upload it. You also need to keep the photo clear, because a blurry photo looks bad to a hiring manager.",
      "Take a clear photo first. Use daylight and a plain background. Keep your head and shoulders in the frame. Do not use a photo from a wedding or a group photo. Crop the photo to head and shoulders before you compress it. A tight crop helps the tool keep quality in the face.",
      "Drop the photo in the tool and pick 100 KB. The tool will try full size first, then step down if needed. It will show the old size, the new size, and the pixel size. Download the file and check the size on your phone. It must be under 100 KB. Open the photo and check the face. If the face is clear, the file is ready.",
      "If the photo is still over 100 KB, check the source file. A very large photo from a new phone can be 8 MB or more. Crop it tighter, or resize it to a smaller pixel size first. A photo that is 1200 px wide is often enough for a job portal. You do not need a 4000 px photo for a small profile box on a website.",
      "Use JPG for a job portal photo. JPG is smaller than PNG for photos of people. PNG is better for a logo or a drawing with sharp lines. For a face, JPG gives a smaller file at the same visual quality. The tool will use JPG by default for this reason.",
      "Keep the final file in a folder with your CV. Name it clearly, such as job-photo-100kb.jpg. When you apply for the next job, you can use the same file. Check the portal limit each time, because one portal may ask for 100 KB and another may ask for 200 KB."
    ]
  },
  {
    slug: "compress-pdf-to-100kb",
    title: "How to compress a PDF to 100 KB",
    description: "A practical guide to shrink a PDF, with honest limits. Text-only PDFs often cannot shrink much, and this guide says when to split the file instead.",
    updated: "2026-11-23",
    body: [
      "A PDF that is over 100 KB is often rejected by a form. The first step is to check what is inside the PDF. Open the PDF and count the pages. A one page PDF with text should be small. A PDF with scanned images will be large. A PDF with many pages will be large. The fix depends on what is inside.",
      "If your PDF is a scan, the images inside are the problem. A scan at high resolution can be 1 MB per page. You can lower the scan quality or use fewer pages. If the form allows it, split the PDF into two parts and upload them one by one. Do not try to force a 10 page scan under 100 KB. The text will become hard to read.",
      "Use the PDF tool on this site. Drop the PDF and pick 100 KB. The tool strips metadata and cleans unused data. It will show the old size and the new size. If the new size is under 100 KB, download it and check it. Open each page and confirm the text is still clear.",
      "If the tool says the PDF cannot reach 100 KB, that is honest. A text-only PDF is already small. It cannot shrink much more without removing pages. In that case, check the form again. Some forms ask for 100 KB for a photo, but allow 500 KB or 1 MB for a PDF. Do not assume the photo limit is the same as the PDF limit.",
      "For a CV in PDF, keep the file simple. Use a plain font and no large images. A CV with a photo can be large. If the form has a separate photo upload, remove the photo from the CV PDF and upload it on its own. That one change can cut the PDF size by half.",
      "Save the final PDF with a clear name, such as cv-100kb.pdf. Keep a copy of the original PDF as well. If the compressed PDF loses quality, you can go back to the original and try a different target, such as 200 KB, if the form allows it."
    ]
  },
  {
    slug: "compress-pdf-to-200kb",
    title: "How to compress a PDF to 200 KB",
    description: "How to shrink a PDF under 200 KB for university and job forms, and how to check that the text is still readable after compression.",
    updated: "2026-11-23",
    body: [
      "A 200 KB limit is common for PDFs on university and job forms in Pakistan. A PDF with a few pages of text should fit under 200 KB. A PDF with scanned pages may not fit. Check the page count first. A short PDF is easier to shrink than a long one.",
      "Open the PDF and look at each page. If a page is a photo of a document, that page is large. If a page is typed text, that page is small. You can save the typed pages as a new PDF and keep the scanned pages for a separate upload. Many forms accept more than one file.",
      "Drop the PDF in the tool and pick 200 KB. The tool will clean the file and show the new size. Download the file and open it. Read the text on each page. Check that stamps, signatures, and numbers are still clear. A PDF that is small but unreadable will cause a problem later.",
      "If the PDF is still over 200 KB, try to reduce the images inside it. Open the source images and compress them first, then make a new PDF from the compressed images. A photo inside a PDF that is 2 MB will keep the PDF large, even after the PDF tool cleans the file.",
      "Do not use a random PDF site that uploads your file to a server. Your PDF may hold a CNIC number, a bank detail, or a home address. Use a tool that works in your browser, so the file never leaves your device. This site works that way. Your file stays on your phone or laptop.",
      "Keep the final PDF in a folder with your other form files. Name it clearly, such as degree-200kb.pdf. When you apply to the next university, you can check the limit and use the same file if it still fits."
    ]
  },
  {
    slug: "passport-photo-35x45-pakistan",
    title: "How to make a passport size photo 35 by 45 mm in Pakistan",
    description: "The exact size for a passport photo in Pakistan, 413 by 531 px at 300 DPI, and how to make it at home with a white background.",
    updated: "2026-11-23",
    body: [
      "A passport size photo in Pakistan is 35 by 45 mm. At 300 DPI, that is 413 by 531 px. Many forms ask for this size. Some forms ask for the same size in mm, some ask for it in px, and some ask for it in KB. You need to get all three right.",
      "Take the photo against a plain white wall. Stand in daylight, face the light, and keep your head straight. Do not tilt your head. Keep your face in the centre. The photo should show your head and shoulders, with space above the head. Do not wear a cap. Do not wear sunglasses.",
      "Use the passport photo tool on this site. Drop your photo and the tool will crop it to 413 by 531 px. It will fill the background with white. Download the single photo first and check it. The face should be clear and centred. The background should be white, not grey.",
      "If you need a print copy, use the print sheet option. It puts 8 photos on one A4 sheet. Take that sheet to a print shop and ask for a print on photo paper. Cut the photos with a cutter. Do not print the sheet on plain paper if you need it for a form that asks for a photo print.",
      "Check the KB size as well. A passport photo for an online form often needs to be under 50 KB or under 100 KB. Use the compressor on this site to hit that target after you make the passport size photo. Do the size step first, then the KB step. That order gives a cleaner result.",
      "Keep a copy of the passport photo on your phone. You will need it for a passport, a CNIC, a university form, and a job form. A clear folder with one good photo saves time each time a new form opens."
    ]
  },
  {
    slug: "nts-photo-size",
    title: "NTS photo size: how to resize a photo for NTS forms",
    description: "NTS forms often ask for a small photo. This guide covers the common size, the KB limit, and the checks to run before you submit.",
    updated: "2026-11-23",
    body: [
      "NTS is the National Testing Service. Its forms often ask for a photo that is small in both px and KB. A common size is 200 by 250 px and under 50 KB. The exact size is printed on the form for each test, so read that page first. Do not use a size from an old test.",
      "Start with a clear passport size photo. Crop it to head and shoulders. The face should fill most of the frame. A photo with a lot of background wastes px and KB. A tight crop helps the tool keep the face clear at a small size.",
      "Use the tool on this site. Pick the NTS preset if you see it on the portal page, or pick 50 KB by hand. The tool will aim at the target and show the real size. Download the file and check the px size and the KB size. Both must match the form.",
      "Open the downloaded photo and look at it at full size on your phone. The face should still be clear. If the photo looks blocky, start with a better source photo. A photo taken in low light will look worse at a small size. Take a new photo in daylight and try again.",
      "Your signature for NTS needs the same care. Sign on white paper, crop it tight, and compress it to 20 KB. A faint signature will look worse after compression. Use a black pen and press firmly.",
      "Save the final files with clear names, such as nts-photo-50kb.jpg. Keep them in one folder for NTS tests. When the next NTS test opens, check the new form, confirm the limit, and use the same files if they still fit."
    ]
  },
  {
    slug: "nadra-photo-size-20kb",
    title: "NADRA photo size: how to make a photo under 20 KB",
    description: "NADRA uploads at times ask for a photo under 20 KB. This guide shows how to hit that small target without losing the face.",
    updated: "2026-11-23",
    body: [
      "NADRA is the National Database and Registration Authority. Some of its online uploads ask for a photo under 20 KB. That is a small target. A phone photo is often 100 times larger. You need to crop tight and compress with care.",
      "Take a clear photo in daylight against a white wall. Keep your face in the centre. Crop the photo tight around the head and shoulders before you compress it. A tight crop removes wall, sky, and other detail that wastes KB.",
      "Drop the photo in the tool and pick 20 KB. The tool will try full size first, then step the pixel size down. It will keep the highest quality that fits under 20 KB. You will see the old size and the new size. Download the file and check the face. The eyes and mouth should still be clear.",
      "If the tool cannot reach 20 KB, crop tighter and try again. A photo with a busy background is hard to shrink. A photo with a plain white background is easier. If you still cannot reach 20 KB, check the form again. Some NADRA pages allow a larger size, and the 20 KB limit may apply to a different upload on the same site.",
      "Use JPG for a NADRA photo. JPG is smaller than PNG for a photo of a person. The tool uses JPG by default. Do not upload a PNG photo for a small KB target, because a PNG photo of a face is often larger than the same photo in JPG.",
      "Always check the official NADRA page for the upload you are doing. Requirements change, and a limit that was right for one service can be wrong for another. Do not trust a size from a random site. Check the page itself before you upload."
    ]
  },
  {
    slug: "hec-photo-size-attestation",
    title: "HEC photo size for attestation and scholarships in Pakistan",
    description: "HEC attestation and scholarship portals often ask for a photo under 100 KB. This guide shows the size and the steps to get it right.",
    updated: "2026-11-23",
    body: [
      "HEC is the Higher Education Commission of Pakistan. Its attestation and scholarship portals often ask for a photo under 100 KB. The exact limit is printed on the portal page for each service, so read that page first. Do not use a limit from a different HEC service.",
      "Use a recent passport size photo. The photo should be 35 by 45 mm, which is 413 by 531 px at 300 DPI. The background should be white. The face should be clear and centred. A photo taken in daylight will look better after compression than a photo taken at night.",
      "Drop the photo in the tool and pick 100 KB. The tool will aim at 100 KB and show the real result. Download the file and check the size and the pixel size. Both must match what the portal asks for. Open the photo and check the face.",
      "Your documents for HEC attestation also need care. Scan them at a clear resolution, but do not scan at a very high resolution if the portal sets a KB limit for PDFs. A scan at 200 DPI is often enough for a clear read. A scan at 600 DPI will be large and may be rejected.",
      "If the portal asks for a PDF under 500 KB, use the PDF tool on this site. Drop the PDF, pick the target, and check the result. Open each page and confirm the text, stamps, and signatures are still clear. A PDF that is small but unreadable will cause a delay in attestation.",
      "Keep your HEC files in one folder. Name them clearly, such as hec-photo-100kb.jpg and degree-500kb.pdf. When you apply for the next HEC service, you can check the limit and use the same files if they still fit."
    ]
  },
  {
    slug: "compress-signature-to-20kb",
    title: "How to compress a signature to 20 KB",
    description: "A signature for FPSC, PPSC, and NTS often needs to be under 20 KB. This guide shows how to scan, crop, and compress it cleanly.",
    updated: "2026-11-23",
    body: [
      "Many forms in Pakistan ask for a signature under 20 KB. A photo of a signature is often larger than that, because the phone photo holds a lot of white paper. You need to crop the signature tight and compress it with care.",
      "Sign on plain white paper with a black pen. Use a pen with dark ink. Press firmly so the line is dark. Do not sign with a light blue pen. A light line will look faint after compression and may be hard to read.",
      "Take a photo of the signature in daylight, or scan it if you can. Crop the photo tight around the signature. Leave only a small margin of white paper around the ink. A tight crop removes white space that wastes KB. It also makes the signature look larger and clearer.",
      "Drop the signature image in the tool and pick 20 KB. The tool will aim at 20 KB and show the real size. Download the file and check it. The signature should be dark and clear. If it looks faint, start with a darker signature and try again. Do not try to fix a faint signature by raising the quality alone, because the file will go over 20 KB.",
      "Use JPG for a signature. JPG is smaller than PNG for this use. The tool will use JPG by default. Save the file with a clear name, such as sign-20kb.jpg. Keep it in the same folder as your photo, so you can find both files when a form opens.",
      "Check the form for the signature size before you upload it. Some forms ask for 20 KB, some ask for 50 KB. Use the size printed on the advertisement for the post you want. Do not use a size from an old post."
    ]
  },
  {
    slug: "compress-image-to-200kb-for-university",
    title: "How to compress an image to 200 KB for a university admission form",
    description: "University forms in Pakistan often ask for a photo under 200 KB. This guide shows how to hit 200 KB and keep the photo clear.",
    updated: "2026-11-23",
    body: [
      "University admission forms in Pakistan often ask for a photo under 200 KB. That limit is larger than the limit for a job test, so it is easier to hit. A phone photo is still too large, so you need to compress it first.",
      "Use a recent passport size photo. The photo should be 35 by 45 mm, which is 413 by 531 px at 300 DPI. The background should be white. The face should be clear and centred. A photo taken in daylight will look better after compression.",
      "Drop the photo in the tool and pick 200 KB. The tool will aim at 200 KB and show the real size. Download the file and check the size and the pixel size. Open the photo and check the face. If the face is clear, the file is ready for the form.",
      "If the university asks for a PDF of your documents as well, check the PDF limit on the same form page. Some universities allow 500 KB for a PDF, some allow 1 MB. Do not assume the photo limit is the same as the PDF limit. Use the PDF tool on this site for the documents.",
      "Keep a copy of the final photo in a folder for university admissions. Name it clearly, such as uni-photo-200kb.jpg. When you apply to the next university, check the new form, confirm the limit, and use the same file if it still fits.",
      "Always check the official admission page for the university you want. Requirements change from one year to the next. A limit that was right last year can be wrong this year. The official page is the only source you should trust for the final limit."
    ]
  }
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
