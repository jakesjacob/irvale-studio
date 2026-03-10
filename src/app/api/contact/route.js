import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, company, niche, services, budget, description, source } = body;

    // Basic validation
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and description are required.' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Resend for email delivery
    // For now, log the submission
    console.log('Contact form submission:', {
      name, email, company, niche, services, budget, description, source,
      timestamp: new Date().toISOString(),
    });

    // Placeholder response — replace with Resend integration
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
