import { NextResponse } from "next/server";
import { google } from "googleapis";

type ContactFormData = {
  fullName: string;
  telegramUser: string;
  phone: string;
  email: string;
  companyName: string;
  industry: string;
  website?: string;
  country: string;
};

// Google Sheets API налаштування
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '1K7ov5VZ4bQlxyGM25jf12Bq_vkHO1kF8uoQxDYCdxmE';
const RANGE = 'Sheet1!A:I'; // Включаємо всі колонки з A до I

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const bodyJSON = (await request.json()) as ContactFormData;
    const { fullName, telegramUser, phone, email, companyName, industry, website, country } = bodyJSON;

    // Отримуємо поточну кількість рядків для додавання нового
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const rowCount = (response.data.values?.length || 0);
    
    // Підготовка даних для додавання
    const values = [
      [
        rowCount, // # (номер рядка)
        fullName, // Full Name
        telegramUser, // Telegram user
        phone, // Phone
        email, // Email
        companyName, // Company Name
        industry, // Industry
        website || '', // Website (порожній рядок якщо не вказано)
        country, // Country
      ]
    ];

    // Додаємо новий рядок
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });

    return NextResponse.json({ 
      message: "Contact form data saved successfully to Google Sheets.",
      rowNumber: rowCount 
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error saving to Google Sheets:", errorMessage);
    return NextResponse.json(
      { message: "Failed to save contact form data.", error: errorMessage },
      { status: 500 }
    );
  }
}
