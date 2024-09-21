"""rename orientaion1

Revision ID: 1b479149e24e
Revises: cb9afd14e0f2
Create Date: 2024-09-21 19:15:02.296970

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1b479149e24e'
down_revision: Union[str, None] = 'cb9afd14e0f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('course') as batch:
        batch.alter_column('orientaion', new_column_name='orientation')


def downgrade() -> None:
    pass
